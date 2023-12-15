using AutoMapper;
using EnterpriseDevProj.Models.UserFolder;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Runtime.InteropServices;
using System.Security.Claims;
using System.Text;
using static System.Net.WebRequestMethods;

namespace EnterpriseDevProj.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GroupController : ControllerBase
    {
        private readonly MyDbContext dbContext;
        private readonly ILogger<GroupController> logger;
        private readonly IConfiguration configuration;
        private readonly IMapper mapper;

        public GroupController(MyDbContext dbContext, ILogger<GroupController> logger, IConfiguration configuration, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.logger = logger;
            this.configuration = configuration;
            this.mapper = mapper;
        }

        [HttpPost("addGroup"), Authorize(Roles = "User")]
        public IActionResult AddUserGroup(GroupCreateRequest createRequest)
        {
            try
            {
                var userID = GetUserID();
                var now = DateTime.Now;
                var userGrpName = createRequest.GroupName;

                var checkGrpName = dbContext.UserGroups.Where(x => x.GroupName == userGrpName).FirstOrDefault();
                if (checkGrpName != null)
                {
                    return BadRequest("Group name already exists!");
                }

                UserGroup userGrp = new()
                {
                    GroupName = userGrpName.Trim(),
                    CreatedAt = now,
                    UpdatedAt = now,
                    UserID = userID,
                };

                dbContext.UserGroups.Add(userGrp);
                dbContext.SaveChanges();

                var createdGrpID = dbContext.UserGroups.Where(x => x.GroupName == userGrpName).First().Id;
                UserGroupLink group = new()
                {
                    UserID = userID,
                    GroupID = createdGrpID,
                    CreatedAt = now,
                    UpdatedAt = now,
                };

                dbContext.UserGroupLinks.Add(group);
                dbContext.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error registering groups. ERRCODE 1007");
                return StatusCode(500);
            }
        }

        [HttpPost("joinGroup/{groupId}"), Authorize(Roles = "User")]
        public IActionResult JoinUserGroup(int groupId)
        {
            try
            {
                var userID = GetUserID();
                var grpID = groupId;
                var now = DateTime.Now;

                var checkIfJoined = dbContext.UserGroupLinks.Where(l => l.GroupID == grpID && l.UserID == userID).FirstOrDefault();
                if (checkIfJoined != null)
                {
                    return BadRequest("You are already part of the group!");
                }

                UserGroupLink group = new()
                {
                    UserID = userID,
                    GroupID = grpID,
                    CreatedAt = now,
                    UpdatedAt = now,
                };
                
                dbContext.UserGroupLinks.Add(group);
                dbContext.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error in joining group. ERRCODE 1008");
                return StatusCode(500);
            }
        }

        [HttpPut("editGroupName/{grpId}"), Authorize(Roles = "User")]
        public IActionResult ChangeGroupName(int grpId ,string userGrpName)
        {
            try
            {
                var grp = dbContext.UserGroups.Find(grpId);

                grp.GroupName = userGrpName.Trim();

                dbContext.UserGroups.Update(grp);
                dbContext.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Unable to update Group name. ERRCODE 1009");
                return StatusCode(500);
            }
        }

        [HttpDelete("deleteGroup/{grpId}"), Authorize(Roles = "User")]
        public IActionResult DeleteGroup(int grpId)
        {
            try
            {
                var userID = GetUserID();
                var grp = dbContext.UserGroups.Where(x => x.UserID == userID && x.Id == grpId).FirstOrDefault();

                if (grp == null) 
                {
                    return BadRequest("Unable to delete user group!");
                }

                dbContext.UserGroups.Remove(grp);
                dbContext.SaveChanges();

                return Ok();

            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Unable to delete group. ERRCODE 1010");
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
