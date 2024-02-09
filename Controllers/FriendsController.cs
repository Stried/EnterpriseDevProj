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
                _logger.LogError(ex, "Error in retrieveing friend requests");
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
