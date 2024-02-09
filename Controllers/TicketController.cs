﻿using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using EnterpriseDevProj.Models.TicketFolder;
using Microsoft.AspNetCore.Authorization;

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

                dbContext.Add(createTicketRequest);
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
            catch (Exception ex)
            {
                logger.LogError(ex, "Error getting all tickets");
                return StatusCode(500);
            }
        }

        // TODO: 
        // GET Endpoint (Get ALL)
        // PUT Endpoint (Header, Body, Attached File)
        // DELETE Endpoint (Delete by ID)
    } 
}
