using AutoMapper;
using EnterpriseDevProj.Models.UserFolder;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using static System.Net.WebRequestMethods;

namespace EnterpriseDevProj.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly MyDbContext dbContext;
        private readonly ILogger<AdminController> logger;
        private readonly IConfiguration configuration;
        private readonly IMapper mapper;

        public AdminController(MyDbContext dbContext, ILogger<AdminController> logger, IConfiguration configuration, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.logger = logger;
            this.configuration = configuration;
            this.mapper = mapper;
        }

        [HttpGet("getAllUsers"), Authorize(Roles = "Administrator")]
        public IActionResult GetAllUsers(string? search)
        {
            IQueryable<User> userList = dbContext.Users;
            if (search != null) 
            {
                userList = userList.Where(x => x.Name.Contains(search)
                || x.Email.Contains(search)
                || x.NRIC.Contains(search)
                || x.PhoneNumber.ToString().Contains(search));
            }

            var returnedUserList = userList.OrderBy(x => x.Name).ToList();
            return Ok(returnedUserList);
        }

        [HttpGet("{userID}"), Authorize(Roles = "Administrator")]
        [ProducesResponseType(typeof(IEnumerable<UserDTO>),StatusCodes.Status200OK)]
        public IActionResult GetUser(string id)
        {
            try
            {
                var userId = id;
                var userAccCheck = dbContext.Users.Find(userId);
                if (userAccCheck == null)
                {
                    logger.LogError("User account not found");
                    return StatusCode(500);
                }

                var userDTO = mapper.Map<UserDTO>(userAccCheck);
                return Ok(userDTO);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "User account not found");
                return StatusCode(500);
            }
        }

        [HttpPut("updateUser/{userID}"), Authorize(Roles = "Administrator")]
        public IActionResult AdminUpdateUser(int userID, UpdateUserRequest updateUserRequest)
        {
            try
            {
                var userId = userID;
                var userAccCheck = dbContext.Users.Find(userId);
                if (userAccCheck == null)
                {
                    logger.LogError("User account not found");
                    return StatusCode(500);
                }

                userAccCheck.Name = updateUserRequest.Name.Trim();
                userAccCheck.Email = updateUserRequest.Email.Trim();
                userAccCheck.PhoneNumber = updateUserRequest.PhoneNumber;

                dbContext.Users.Update(userAccCheck);
                dbContext.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Unable to Admin Update user information.");
                return StatusCode(500);
            }
        }
        
        [HttpPut("updateUserRole/{NRIC}"), Authorize(Roles = "Administrator")]
        public IActionResult updateUserRole(string NRIC, UpdateUserRoleRequest roleUpdate)
        {
            var user = dbContext.Users.FirstOrDefault(x => x.NRIC == NRIC);
            if (user == null)
            {
                logger.LogError($"User's NRIC {NRIC} not found!. ERRCODE 1007");
                return StatusCode(500);
            }

            user.UserRole = roleUpdate.UserRole.Trim();

            dbContext.Users.Update(user);
            dbContext.SaveChanges();

            return Ok();
        }
    }
}
