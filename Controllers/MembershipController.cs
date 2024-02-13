using EnterpriseDevProj.Models.MembershipFolder;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EnterpriseDevProj.Controllers
{
    public class MembershipController : ControllerBase
    {
        private MyDbContext _context;
        private ILogger<MembershipController> _logger;

        public MembershipController(MyDbContext context, ILogger<MembershipController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpPost("createNewMember/{userEmail}")]
        public IActionResult CreateStandardMember(string userEmail)
        {
            try
            {
                var user = _context.Users.Where(x => x.Email == userEmail).FirstOrDefault();
                if (user == null)
                {
                    _logger.LogError("Error in getting user for membership");
                    return StatusCode(500);
                }

                Membership membership = new()
                {
                    UserId = user.Id,
                    MembershipStatus = "Standard"
                };

                _context.Memberships.Add(membership);
                _context.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in adding user for membersip: Standard");
                return StatusCode(500);
            }
        }

        [HttpPost("changeStatus/friendsOfUplay"), Authorize]
        public IActionResult UpgradeToFriendsOfUplay()
        {
            var userID = GetUserID();
            var memberUser = _context.Memberships.Where(u => u.UserId == userID).FirstOrDefault();
            if (memberUser == null)
            {
                _logger.LogError("Error in retrieving user to upgrade to FriendsOfUPlay");
                return StatusCode(500);
            }

            memberUser.MembershipStatus = "FriendsOfUPlay";
            _context.Memberships.Update(memberUser);
            _context.SaveChanges();

            return Ok();
        }

        [HttpPost("changeStatus/NTUCMember"), Authorize]
        public IActionResult UpgradeToNTUCMember()
        {
            var userID = GetUserID();
            var memberUser = _context.Memberships.Where(u => u.UserId == userID).FirstOrDefault();
            if (memberUser == null)
            {
                _logger.LogError("Error in retrieving user to upgrade to FriendsOfUPlay");
                return StatusCode(500);
            }

            memberUser.MembershipStatus = "NTUCMember";
            _context.Memberships.Update(memberUser);
            _context.SaveChanges();

            return Ok();
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
    }
}
