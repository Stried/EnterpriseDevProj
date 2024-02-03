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

        [HttpPost("addGroup"), Authorize]
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

        [HttpPost("joinGroup/{groupId}"), Authorize]
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

        [HttpPut("editGroupName/{grpId}"), Authorize]
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

        [HttpDelete("deleteGroup/{grpId}"), Authorize]
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

        [HttpGet("getUserGroups"), Authorize]
        [ProducesResponseType(typeof(IEnumerable<UserGroup>), StatusCodes.Status200OK)]
        public IActionResult GetUserGroups(string? search)
        {
            try
            {
                var userID = GetUserID();

                // try to solve this
                var groupings = from userGroups in dbContext.UserGroups
                                join userGroupLinks in dbContext.UserGroupLinks on userGroups.Id equals userGroupLinks.GroupID
                                where userGroupLinks.UserID == userID
                                select userGroups;
                
                groupings = groupings.OrderByDescending(x => x.CreatedAt);

                return Ok(groupings);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error in Retrieving User Groups. ERRCODE 1011");
                return StatusCode(500);
            }
        }

        [HttpGet("groupDetails/{groupID}"), Authorize]
        public IActionResult GetGroupDetails(int groupID)
        {
            var id = groupID;
            IQueryable<UserGroupLink> groupUsers = dbContext.UserGroupLinks;
            groupUsers = groupUsers.Where(group => group.GroupID == id);

            var returnedGroupUsers = groupUsers.OrderBy(x => x.CreatedAt).ToList();
            return Ok(returnedGroupUsers);
        }

        [HttpGet("getGroupInfo/{groupID}"), Authorize]
        public IActionResult GetGroupInformation(int groupID)
        {
            var id = groupID;
            var groupGet = dbContext.UserGroups.Find(groupID);

            return Ok(groupGet);
        }

        [HttpGet("getAllUsers/{listOfUsers}")]
        public IActionResult AllGroupUsers(string listOfUsers)
        {
            var userIdList = listOfUsers.Split(',');
            var finalUserList = new List<User>();

            IQueryable<User> users = dbContext.Users;
            for (int i = 0; i < userIdList.Length; i++)
            {
                var userId = Convert.ToInt32(userIdList[i]);
                var userDetails = users.First(x => x.Id == userId);
                finalUserList.Add(userDetails);
            }

            return Ok(finalUserList);
        }

        [HttpDelete("removeUser/{userGroupID}/{userID}"), Authorize]
        public IActionResult removeUser(int userGroupID, int userID)
        {
            var userGrpId = userGroupID;
            var userId = userID;

            var checkUserGroupLink = dbContext.UserGroupLinks.Where(x => x.GroupID == userGrpId && x.UserID == userId).FirstOrDefault();
            if (checkUserGroupLink == null)
            {
                return BadRequest("Unable to remove user from group");
            }

            dbContext.UserGroupLinks.Remove(checkUserGroupLink);
            dbContext.SaveChanges();

            return Ok();
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
