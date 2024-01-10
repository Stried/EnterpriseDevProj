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
        private readonly IConfiguration configuration;
        private readonly IMapper mapper;

        public EventController(MyDbContext dbContext, ILogger<EventController> logger, IConfiguration configuration, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.logger = logger;
            this.configuration = configuration;
            this.mapper = mapper;
        }


        [HttpPost("Applications")]
        public IActionResult AddEvents(EventApplication data)
        {
            try
            {
                
                int userId = GetUserID();
                logger.LogInformation($"Received Eventssssssss Application from User {userId}");
                var now = DateTime.Now;

                data.EventName=data.EventName.Trim();
                data.EventPrice = data.EventPrice;
                data.FriendPrice = data.FriendPrice;
                data.NTUCPrice = data.NTUCPrice;
                data.MaxPax = data.MaxPax;
                data.Approval = data.Approval;
                data.ActivityType = data.ActivityType.Trim();
                data.EventLocation = data.EventLocation.Trim();
                data.ExpiryDate = data.ExpiryDate;
                data.RemainingPax = data.RemainingPax;
                data.AvgRating = data.AvgRating;
                data.DateType = data.DateType.Trim();
                data.ContentHTML = data.ContentHTML;


                var myEvent = new Event()
                {
                    EventName = data.EventName,
                    EventPrice = data.EventPrice,
                    FriendPrice = data.FriendPrice,
                    NTUCPrice = data.NTUCPrice,
                    MaxPax = data.MaxPax,
                    Approval = false,
                    ActivityType = data.ActivityType,
                    EventLocation = data.EventLocation,
                    ExpiryDate = data.ExpiryDate,
                    RemainingPax = data.RemainingPax,
                    AvgRating = data.AvgRating,
                    DateType = data.DateType,
                    ContentHTML = data.ContentHTML,
                    UserID = userId,
                    EventCreatedAt = now,
                    EventUpdatedAt = now,
                };

                dbContext.Events.Add(myEvent);
                dbContext.SaveChanges();
                return Ok(myEvent);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error Creating Event Application. ERRCODE 100007");
                return StatusCode(500);
            }
        }

        [HttpPost("Application")]
        public IActionResult AddEvent(Event eventModel)
        {
            try
            {
                
                int userId = GetUserID();
                logger.LogInformation($"Received Event Application from User {userId}");
                var now = DateTime.Now;
                var myEvent = new Event()
                {
                    EventName = eventModel.EventName.Trim(),
                    EventPrice = eventModel.EventPrice,
                    FriendPrice = eventModel.FriendPrice,
                    NTUCPrice = eventModel.NTUCPrice,
                    MaxPax = eventModel.MaxPax,
                    Approval = false,
                    ActivityType = eventModel.ActivityType.Trim(),
                    EventLocation = eventModel.EventLocation.Trim(),
                    ExpiryDate = eventModel.ExpiryDate,
                    RemainingPax = eventModel.RemainingPax,
                    AvgRating = eventModel.AvgRating,
                    DateType = eventModel.DateType.Trim(),
                    ContentHTML = eventModel.ContentHTML.Trim(),
                    UserID = userId,
                    EventCreatedAt = now,
                    EventUpdatedAt = now,
                };

                dbContext.Events.Add(myEvent);
                dbContext.SaveChanges();
                return Ok(myEvent);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error Creating Event Application. ERRCODE 1007");
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

        [HttpGet("{EventId}"), Authorize]
        public IActionResult GetTutorial(int EventId)
        {
            try
            {
                Event? eventModel = dbContext.Events.Include(t => t.User)
                    .FirstOrDefault(t => t.EventId == EventId); ;
                if (eventModel == null)
                {
                    return NotFound();
                }
                var data = new
                {
                    eventModel.EventId,
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

        [HttpPut("{EventId}"), Authorize]
        public IActionResult UpdateTutorial(int EventId)
        {
            try
            {
                Event? eventModel = dbContext.Events.Include(t => t.User).FirstOrDefault(t => t.EventId == EventId);

                if (eventModel == null)
                {
                    return NotFound();
                }


                eventModel.Approval = eventModel.Approval;
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

        [HttpDelete("EventId"), Authorize]
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
            try
            {
                return Convert.ToInt32(User.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier).Select(c => c.Value).SingleOrDefault());
            }
            catch (Exception ex)
            {
                return 401;
            }
        }

        }
    }


