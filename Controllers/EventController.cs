using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using EnterpriseDevProj.Models.UserFolder;
using EnterpriseDevProj.Models.EventFolder;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
namespace EnterpriseDevProj.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EventController : ControllerBase
    {
        private readonly MyDbContext dbContext;
        private readonly ILogger<EventController> logger;
        private readonly IMapper mapper;

        public EventController(MyDbContext dbContext, ILogger<EventController> logger, IConfiguration configuration, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.logger = logger;
            this.mapper = mapper;
        }


        [HttpPost("Applications"), Authorize]
        [ProducesResponseType(typeof(EventDTO), StatusCodes.Status200OK)]
        public IActionResult AddEvents(EventApplication data)
        {
            try
            {
                
                int userId = GetUserID();
                logger.LogInformation($"Received Event Application from User {userId}");
                var now = DateTime.Now;
                var myEvent = new Event()
                {
                    EventName = data.EventName.Trim(),
                    EventPrice = data.EventPrice,
                    FriendPrice = data.FriendPrice,
                    NTUCPrice = data.NTUCPrice,
                    MaxPax = data.MaxPax,
                    Approval = false,
                    ActivityType = data.ActivityType.Trim(),
                    EventLocation = data.EventLocation.Trim(),
                    ExpiryDate = data.ExpiryDate,
                    RemainingPax = data.RemainingPax,
                    AvgRating = data.AvgRating,
                    DateType = data.DateType.Trim(),
                    ContentHTML = data.ContentHTML,
                    UserID = userId,
                    EventCreatedAt = now,
                    EventUpdatedAt = now,
                };

                dbContext.Events.Add(myEvent);
                dbContext.SaveChanges();

                Event? newEvent = dbContext.Events.Include(t => t.User)
                .FirstOrDefault(t => t.EventId == myEvent.EventId);
                EventDTO eventDTO = mapper.Map<EventDTO>(newEvent);
                return Ok(eventDTO);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error Creating Event Application. ERRCODE 100007");
                return StatusCode(500);
            }
        }

        [HttpGet("GetAllApplications")]
        public IActionResult GetAllEventApplication(string? search)
        {
            try
            {
                IQueryable<Event> result = dbContext.Events.Include(t => t.User);

                if (search != null)
                {
                    result = result.Where(x => x.EventName.Contains(search)
                    );
                }
                
                var listofEvents = result.OrderByDescending(x => x.EventCreatedAt).ToList();
                var data = listofEvents.Select(t => new
                {
                    t.EventId,
                    t.EventName,
                    t.EventPrice,
                    t.FriendPrice,
                    t.NTUCPrice,
                    t.MaxPax,
                    t.Approval,
                    t.ActivityType,
                    t.EventLocation,
                    t.ExpiryDate,
                    t.RemainingPax,
                    t.AvgRating,
                    t.DateType,
                    t.ContentHTML,
                    t.UserID,
                    t.EventCreatedAt,
                    t.EventUpdatedAt
                });
                return Ok(data);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error Retrieving Event Applications. ERRCODE 1008");
                return StatusCode(500);
            }
        }

        [HttpGet("Details/{EventId}"), Authorize]
        public IActionResult GetEvent(int EventId)
        {
            try
            {
                Event? eventModel = dbContext.Events.Include(t => t.User)
                    .FirstOrDefault(t => t.EventId == EventId); 
                if (eventModel == null)
                {
                    return NotFound();
                }
                var data = new
                {
                    eventModel.EventId,
                    eventModel.EventName,
                    eventModel.EventPrice,
                    eventModel.FriendPrice,
                    eventModel.NTUCPrice,
                    eventModel.MaxPax,
                    eventModel.Approval,
                    eventModel.ActivityType,
                    eventModel.EventLocation,
                    eventModel.ExpiryDate,
                    eventModel.RemainingPax,
                    eventModel.AvgRating,
                    eventModel.DateType,
                    eventModel.ContentHTML,
                    eventModel.UserID,
                    eventModel.EventCreatedAt,
                    eventModel.EventUpdatedAt,
                    User = new
                    {
                        eventModel.User?.Name
                    }
                };
                return Ok(data);
            }
            catch(Exception ex)
            {
                logger.LogError(ex, $"Error Retrieving Event Application {EventId}, ERRCODE 1009");
                return StatusCode(500);
            }
        }

        [HttpPut("Approval/{EventId}"), Authorize]
        public IActionResult UpdateTutorial(int EventId)
        {
            try
            {
                Event? eventModel = dbContext.Events.Include(t => t.User).FirstOrDefault(t => t.EventId == EventId);

                if (eventModel == null)
                {
                    return NotFound();
                }


                eventModel.Approval = true;
                eventModel.EventUpdatedAt = DateTime.Now;

                dbContext.SaveChanges();
                return Ok(dbContext.Events.ToList());
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Error Approving Event Application , ERRCODE 1010");
                return StatusCode(500);
            }
        }

        [HttpDelete("{EventId}"), Authorize]
        public IActionResult DeleteEventApplication(int EventId)
        {
            try { 
            var eventmodel = dbContext.Events.FirstOrDefault(x => x.EventId == EventId);
            if (eventmodel != null)
            {
                dbContext.Events.Remove(eventmodel);
                dbContext.SaveChanges();
            }
            return Ok(dbContext.Events.ToList());
        } catch (Exception ex)
            {
                logger.LogError(ex, $"Error Deleting Event Application {EventId}, ERRCODE 1011");
                return StatusCode(500);
            }
        }

        private int GetUserID()
        {
            return Convert.ToInt32(User.Claims
                            .Where(c => c.Type == ClaimTypes.NameIdentifier)
                            .Select(c => c.Value).SingleOrDefault());
        }

        }
    }


