using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using EnterpriseDevProj.Models.TicketFolder;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace EnterpriseDevProj.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TicketController : ControllerBase
    {
        private readonly MyDbContext dbContext;
        private readonly ILogger<TicketController> logger;
        private readonly IConfiguration configuration;
        private readonly IMapper mapper;

        public TicketController(MyDbContext dbContext, ILogger<TicketController> logger, IConfiguration configuration, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.logger = logger;
            this.configuration = configuration;
            this.mapper = mapper;
        }

        [HttpPost("TicketCreate")]
        public IActionResult TicketCreate(CreateTicketRequest createTicketRequest)
        {
            try
            {
                var now = DateTime.Now;

                createTicketRequest.TicketHeader = createTicketRequest.TicketHeader.Trim();
                createTicketRequest.TicketBody = createTicketRequest.TicketBody.Trim();
                createTicketRequest.SenderEmail = createTicketRequest.SenderEmail.Trim();
                createTicketRequest.AttachedFilename = createTicketRequest.AttachedFilename.Trim();

                Ticket newTicket = new()
                {
                    TicketCategory = createTicketRequest.TicketCategory,
                    TicketHeader = createTicketRequest.TicketHeader,
                    TicketBody = createTicketRequest.TicketBody,
                    SenderEmail = createTicketRequest.SenderEmail,
                    AttachedFilename = createTicketRequest.AttachedFilename,
                    CreatedAt = now,
                    UpdatedAt = now,
                };

                dbContext.Tickets.Add(newTicket);
                dbContext.SaveChanges();
                return Ok();
            }
            catch (Exception e)
            {
                logger.LogError(e, "Failed to create ticket. Please troubleshoot the abovementioned error(s) and try again.");
                return StatusCode(500);
            }
        }

        [HttpGet("getAllTickets"), Authorize]
        public IActionResult GetAllTickets(string? search)
        {
            try
            {
                var now = DateTime.Now;

                IQueryable<Ticket> ticketsList = dbContext.Tickets;
                
                if (search != null)
                {
                    ticketsList = ticketsList.Where(x => x.TicketHeader.Contains(search));
                }

                var finalisedTicketsList = ticketsList.OrderBy(x => x.TicketCategory).ToList();
                return Ok(finalisedTicketsList);
            }
            catch (Exception e)
            {
                logger.LogError(e, "Unable to gather info on tickets.");
                return StatusCode(500);
            }
        }

        [HttpPut("updateTicketDetails/{ticketId}"), Authorize]
        public IActionResult UpdateTicketDetails(UpdateTicketDetails updateTicketDetails, int ticketId)
        { 
            try
            {
                var ticketID = ticketId;
                var ticketItem = dbContext.Tickets.Find(ticketID);

                if (ticketItem == null)
                {
                    logger.LogError("Ticket item not found");
                    return StatusCode(500);
                }

                ticketItem.TicketHeader = updateTicketDetails.TicketHeader.Trim();
                ticketItem.TicketBody = updateTicketDetails.TicketBody.Trim();
                ticketItem.SenderEmail = updateTicketDetails.SenderEmail.Trim();
                ticketItem.AttachedFilename = updateTicketDetails.AttachedFilename.Trim();

                dbContext.Tickets.Update(ticketItem);
                dbContext.SaveChanges();

                return Ok();
            }
            catch (Exception e)
            {
                logger.LogError(e, "Error in updating ticket");
                return StatusCode(500);
            }
        }

        [HttpPost("/commentOnTicket/{ticketId}"), Authorize]
        public IActionResult CommentOnTicket(CommentRequest commentRequest, int ticketId)
        {
            try
            {
                var userID = GetUserID();
                var ticketID = ticketId;

                Comment comment = new()
                {
                    CommentBody = commentRequest.CommentBody.Trim(),
                    TicketId = ticketID,
                    UserId = userID
                };

                dbContext.Comments.Add(comment);
                dbContext.SaveChanges();

                return Ok();
            }
            catch (Exception e)
            {
                logger.LogError(e, "Commenting failed. Please try again.");
                return StatusCode(500);
            } 
        }

        public int GetUserID()
        {
            try
            {
                return Convert.ToInt32(User.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier).Select(c => c.Value).SingleOrDefault());
            }
            catch (Exception ex)
            {
                return 401;
            }
        }

        // TODO: 
        // PUT Endpoint (Header, Body, Attached File)
        // DELETE Endpoint (Delete by ID)

    } 
}
