using AutoMapper;
using EnterpriseDevProj.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using static System.Net.WebRequestMethods;
namespace EnterpriseDevProj.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly MyDbContext dbContext;
        private readonly ILogger<UserController> logger;
        private readonly IConfiguration configuration;
        private readonly IMapper mapper;

        public UserController(MyDbContext dbContext, ILogger<UserController> logger, IConfiguration configuration, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.logger = logger;
            this.configuration = configuration;
            this.mapper = mapper;
        }

        [HttpPost("Register")]
        public IActionResult RegisterAccount(RegisterRequest registerRequest)
        {
            try
            {
                var now = DateTime.Now;

                registerRequest.Name = registerRequest.Name.Trim();
                registerRequest.Email = registerRequest.Email.Trim();
                registerRequest.NRIC = registerRequest.NRIC.Trim();
                registerRequest.PhoneNumber = registerRequest.PhoneNumber;
                registerRequest.Password = registerRequest.Password.Trim(); ;

                var userAccCheck = dbContext.Users.Where(x => x.Email == registerRequest.Email).FirstOrDefault();
                if (userAccCheck != null)
                {
                    return BadRequest("User email already exists!");
                }

                var passwordEncrypt = BCrypt.Net.BCrypt.HashPassword(registerRequest.Password);

                User user = new()
                {
                    Name = registerRequest.Name,
                    Email = registerRequest.Email,
                    NRIC = registerRequest.NRIC,
                    PhoneNumber = registerRequest.PhoneNumber,
                    Password = passwordEncrypt,
                    CreatedAt = now,
                    UpdatedAt = now,
                };

                dbContext.Users.Add(user);
                dbContext.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error registering account. ERRCODE 1001");
                return BadRequest(ex.Message);
            }
        }


    }
}
