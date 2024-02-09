using AutoMapper;
using EnterpriseDevProj.Models.FriendsFolder;
using EnterpriseDevProj.Models.UserFolder;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace EnterpriseDevProj.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FriendsController : ControllerBase
    {
        private readonly MyDbContext _context;
        private readonly ILogger<FriendsController> _logger;
        private readonly IConfiguration _configuration;

        public FriendsController(MyDbContext myDbContext, ILogger<FriendsController> logger, IConfiguration configuration)
        {
            _context = myDbContext;
            _logger = logger;
            _configuration = configuration;
        }

        [HttpPost("sendRequest"), Authorize]
        public IActionResult sendFriendRequest(FriendRequest friendRequest)
        {
            try
            {
                var userID = GetUserID();

                Friend newRequest = new()
                {
                    FromUser = userID,
                    ToUser = friendRequest.UserID,
                    RequestApproved = false,
                    UserId = userID,
                };

                _context.Friends.Add(newRequest);
                _context.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occured in adding friend");
                return StatusCode(500);
            }
        }

        [HttpGet("allFriendRequests"), Authorize]
        public IActionResult getAllRequest(string? search)
        {
            try
            {
                var userID = GetUserID();

                var friendRequestList = _context.Friends.Where(u => u.ToUser == userID && u.RequestApproved == false).Include(u => u.User);

                var requestList = friendRequestList.ToList();

                return Ok(requestList);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in retrieving friend requests");
                return StatusCode(500);
            }
        }

        [HttpGet("searchUserEmail"), Authorize]
        public IActionResult getUserByEmail(string? search)
        {
            try
            {
                IQueryable<User> userList = _context.Users;
                if (search != null)
                {
                    userList = userList.Where(x => x.Email.Contains(search));
                    var returnedUserList = userList.OrderBy(x => x.Email).ToList();

                    return Ok(returnedUserList);
                }

                return Ok("");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in finding by email");
                return StatusCode(500);
            }
        }

        [HttpPut("approveRequest/{userId}"), Authorize]
        public IActionResult approveFriendRequest(int userId)
        {
            try
            {
                var id = GetUserID();
                var userID = userId;

                var approveUser = _context.Friends.Where(x => x.ToUser == id && x.FromUser == userID).FirstOrDefault();
                if (approveUser == null)
                {
                    _logger.LogError("Error in retrieving friend request.");
                    return StatusCode(500);
                }

                approveUser.RequestApproved = true;
                _context.Friends.Update(approveUser);
                _context.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError("Error in approving friend request");
                return StatusCode(500);
            }
        }

        [HttpDelete("approveDelete/{userId}"), Authorize]
        public IActionResult denyFriendRequest(int userId)
        {
            try
            {
                var id = GetUserID();
                var userID = userId;

                var denyUser = _context.Friends.Where(x => x.ToUser == id && x.FromUser == userID).FirstOrDefault();
                if (denyUser != null)
                {
                    _context.Friends.Remove(denyUser);
                    _context.SaveChanges();

                    return Ok();
                }

                var denyUser2 = _context.Friends.Where(x => x.ToUser == userID && x.FromUser == id).FirstOrDefault();
                if (denyUser != null)
                {
                    _context.Friends.Remove(denyUser2);
                    _context.SaveChanges();

                    return Ok();
                }

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in denying friend request");
                return StatusCode(500);
            }
        }

        [HttpGet("getApprovedFriends"), Authorize]
        public IActionResult getApprovedFriends()
        {
            try
            {
                var id = GetUserID();
                var finalList = new List<User>();

                var approvedFriendsList = _context.Friends.Where(x => x.ToUser == id || x.FromUser == id).Where(a => a.RequestApproved == true).Include(u => u.User).OrderBy(x => x.FromUser).ToList();
                for (int i = 0; i < approvedFriendsList.Count; i++)
                {
                    if (approvedFriendsList[i].ToUser == id)
                    {
                        var user = _context.Users.Find(approvedFriendsList[i].FromUser);
                        finalList.Add(user);
                    }
                    else if (approvedFriendsList[i].FromUser == id)
                    {
                        var user = _context.Users.Find(approvedFriendsList[i].ToUser);
                        finalList.Add(user);
                    }
                }

                return Ok(finalList);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in retrieving all approved friend requests");
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
