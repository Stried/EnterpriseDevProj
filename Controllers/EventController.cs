using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using EnterpriseDevProj.Models.UserFolder;
using EnterpriseDevProj.Models.EventFolder;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Query.Internal;
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
        if (!ModelState.IsValid)
    {
        return BadRequest(ModelState);
    }
    using (var transaction = dbContext.Database.BeginTransaction())
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
                    AvgRating = data.AvgRating,
                    ContentHTML = data.ContentHTML,
                    UserID = userId,
                    EventCreatedAt = now,
                    EventUpdatedAt = now,
            };

            dbContext.Events.Add(myEvent);
            dbContext.SaveChanges();

            int eventId = myEvent.EventId;

            for (int i = 0; i < data.EventDates.Count; i++)
            {
                DateTime currentDate = data.EventDates[i];
                var myDate = new Date()
                {
                        EventName=data.EventName.Trim(),
                        RemainingPax=data.MaxPax,
                        DateOfEvent=currentDate,
                        DateCreatedAt=now,
                        DateUpdatedAt=now,
                        EventId=eventId
                };

                dbContext.Dates.Add(myDate);
                dbContext.SaveChanges();
            }

            transaction.Commit();

            EventDTO eventDTO = mapper.Map<EventDTO>(myEvent);
            return Ok(eventDTO);
        }
        catch (Exception ex)
        {
            transaction.Rollback();

            logger.LogError(ex, "Error Creating Event Application. ERRCODE 100007");
            return StatusCode(500);
        }
    }
}

        [HttpGet("GetAllApplications")]
        public IActionResult GetAllEventApplication(string? search)
        {
            try
            {
                IQueryable<Event> result = dbContext.Events.Include(t => t.User);
                result = result.Where(x => x.Approval == false);
                if (search != null)
                {
                result = result.Where(x => x.EventName.Contains(search) || x.UserID.ToString().Contains(search));
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
                    t.AvgRating,
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

        [HttpGet("GetAllEvents")]
        public IActionResult GetAllEvents(string? search)
        {
            try
            {
                IQueryable<Event> result = dbContext.Events.Include(t => t.User).Include(t => t.Dates);
                result = result.Where(x => x.Approval == true);
                
                if (search != null)
                {
                    result = result.Where(x => x.EventName.Contains(search) || x.UserID.ToString().Contains(search));
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
                    t.AvgRating,
                    t.ContentHTML,
                    t.UserID,
                    t.EventCreatedAt,
                    t.EventUpdatedAt,
                    User = new
                    {
                        t.User?.Name
                    },
                    Dates = t.Dates.Select(d => new
                    {
                        d.DateId,
                        d.EventName,
                        d.RemainingPax,
                        d.DateOfEvent,
                        d.DateCreatedAt,
                        d.DateUpdatedAt
                    })
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

        var datesList = dbContext.Dates
            .Where(d => d.EventId == EventId)
            .Select(d => new
            {
                d.DateId,
                d.EventName,
                d.RemainingPax,
                d.DateOfEvent,
                d.DateCreatedAt,
                d.DateUpdatedAt
            })
            .ToList();

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
            eventModel.AvgRating,
            eventModel.ContentHTML,
            eventModel.UserID,
            eventModel.EventCreatedAt,
            eventModel.EventUpdatedAt,
            User = new
            {
                eventModel.User?.Name
            },
            Dates = datesList 
        };

        return Ok(data);
    }
    catch (Exception ex)
    {
        logger.LogError(ex, $"Error Retrieving Event Application {EventId}, ERRCODE 1009");
        return StatusCode(500);
    }
}

        [HttpPut("Approval/{EventId}"), Authorize]
        public IActionResult Approval(int EventId)
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


        [HttpPut("UpdateEvent/{eventId}")]
        [Authorize]
        public IActionResult UpdateEvent(int eventId, UpdateEvent updateModel)
        {
            try
            {
                Event eventModel = dbContext.Events.Include(t => t.User).FirstOrDefault(t => t.EventId == eventId);

                if (eventModel == null)
                {
                    return NotFound();
                }

                using (var transaction = dbContext.Database.BeginTransaction())
                {
                    try
                    {
                        var outdatedDates = dbContext.Dates
                            .Where(d => d.EventId == eventId && !updateModel.EventDates.Contains(d.DateOfEvent))
                            .ToList();

                        dbContext.Dates.RemoveRange(outdatedDates);

                        var newDates = updateModel.EventDates
                            .Where(date1 => !dbContext.Dates.Any(date2 => date2.EventId == eventId && date2.DateOfEvent == date1))
                            .Select(newDate => new Date
                            {
                                EventName = eventModel.EventName,
                                RemainingPax = eventModel.MaxPax,
                                DateOfEvent = newDate,
                                DateCreatedAt = DateTime.UtcNow,
                                DateUpdatedAt = DateTime.UtcNow,
                                EventId = eventId
                            });

                        dbContext.Dates.AddRange(newDates);
                        eventModel.EventName = updateModel.EventName;
                        eventModel.EventPrice = updateModel.EventPrice;
                        eventModel.FriendPrice = updateModel.FriendPrice;
                        eventModel.NTUCPrice = updateModel.NTUCPrice;
                        eventModel.MaxPax = updateModel.MaxPax;
                        eventModel.Approval = updateModel.Approval;
                        eventModel.ActivityType = updateModel.ActivityType;
                        eventModel.EventLocation = updateModel.EventLocation;
                        eventModel.ExpiryDate = updateModel.ExpiryDate;
                        eventModel.ContentHTML = updateModel.ContentHTML;
                        eventModel.EventUpdatedAt = DateTime.UtcNow;

                        dbContext.SaveChanges();

                        transaction.Commit();


                        return Ok(dbContext.Events.ToList());
                    }
                    catch (Exception ex)
                    {

                        logger.LogError(ex, $"Error Updating Event, ERRCODE 1010");


                        transaction.Rollback();

                        return StatusCode(500);
                    }
                }
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Error Updating Event, ERRCODE 1010");
                return StatusCode(500);
            }
        }

        [HttpDelete("{EventId}"), Authorize]
        public IActionResult DeleteEventApplication(int EventId)
        {
            try
            {
                var eventmodel = dbContext.Events.FirstOrDefault(x => x.EventId == EventId);
                if (eventmodel != null)
                {
                    dbContext.Events.Remove(eventmodel);
                    dbContext.SaveChanges();
                }
                return Ok(dbContext.Events.ToList());
            }
            catch (Exception ex)
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


