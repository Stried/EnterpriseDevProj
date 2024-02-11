using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using EnterpriseDevProj.Models.TicketFolder;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;

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
                var userID = GetUserID();

                createTicketRequest.TicketHeader = createTicketRequest.TicketHeader.Trim();
                createTicketRequest.TicketBody = createTicketRequest.TicketBody.Trim();
                createTicketRequest.SenderEmail = createTicketRequest.SenderEmail.Trim();
                if (createTicketRequest.SenderEmail.IsNullOrEmpty())
                {
                    var userAcc = dbContext.Users.Find(userID);
                    createTicketRequest.SenderEmail = userAcc.Email;
                }

                createTicketRequest.AttachedFilename = createTicketRequest.AttachedFilename.Trim();

                Ticket newTicket = new()
                {
                    TicketCategory = createTicketRequest.TicketCategory,
                    TicketHeader = createTicketRequest.TicketHeader,
                    TicketBody = createTicketRequest.TicketBody,
                    TicketStatus = "Open",
                    SenderEmail = createTicketRequest.SenderEmail,
                    AttachedFilename = createTicketRequest.AttachedFilename,
                    UserId = userID,
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

        [HttpGet("getOneTicket/{ticketId}"), Authorize]
        public IActionResult GetTicket(int ticketId)
        {
            try
            {
                var ticketID = ticketId;

                var ticket = dbContext.Tickets.Find(ticketID);
                if (ticket == null)
                {
                    logger.LogError("Ticket cannot be found");
                    return StatusCode(500);
                }

                return Ok(ticket);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error getting single ticket");
                return StatusCode(500);
            }
        }

        [HttpGet("getAllUserTickets"), Authorize]
        public IActionResult GetAllUserTickets()
        {
            try
            {
                var userID = GetUserID();
                var tickets = dbContext.Tickets.Where(x => x.UserId == userID).ToList();

                return Ok(tickets);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error in retrieving user's tickets");
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

        [HttpPost("commentOnTicket/{ticketId}"), Authorize]
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

        [HttpGet("getCommentsOnTicket/{ticketId}")]
        public IActionResult GetCommentOnTicket(int ticketId) 
        { 
            try
            {
                var commentsOnTicket = dbContext.Comments.Where(x => x.TicketId == ticketId).Include(x => x.User).ToList();
                return Ok(commentsOnTicket);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error in getting comments for ticket");
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
