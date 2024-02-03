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
                registerRequest.Password = registerRequest.Password.Trim();
                registerRequest.UserRole = registerRequest.UserRole.Trim();

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
                    ImageFile = registerRequest.ImageFile,
                    UserRole = registerRequest.UserRole,
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
                return StatusCode(500);
            }
        }

        [HttpPost("Login")]
        [ProducesResponseType(typeof(IEnumerable<LoginResponse>), StatusCodes.Status200OK)]
        public IActionResult Login(LoginRequest loginRequest)
        {
            try
            {
                loginRequest.Email = loginRequest.Email.Trim();
                loginRequest.Password = loginRequest.Password.Trim();
                var message = "Email or Password is invalid, please try again.";

                var userAccCheck = dbContext.Users.Where(x => x.Email == loginRequest.Email).FirstOrDefault();
                if (userAccCheck == null)
                {
                    logger.LogError($"User account {loginRequest.Email} is not found.");
                    return BadRequest(new { message });
                }

                var userPassCheck = BCrypt.Net.BCrypt.Verify(loginRequest.Password, userAccCheck.Password);
                if (!userPassCheck)
                {
                    logger.LogError($"The password does not match the account's password.");
                    return BadRequest(new { message });
                }

                User user = new()
                {
                    Id = userAccCheck.Id,
                    Name = userAccCheck.Name,
                    NRIC = userAccCheck.NRIC,
                    Email = userAccCheck.Email,
                    PhoneNumber = userAccCheck.PhoneNumber,
                    ImageFile = userAccCheck.ImageFile,
                    UserRole = userAccCheck.UserRole
                };

                UserDTO userDTO = mapper.Map<UserDTO>(user);
                string accessToken = CreateToken(user);
                LoginResponse loginResponse = new() { User = userDTO, AccessToken = accessToken };

                return Ok(loginResponse);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error logging into account. ERRCODE 1002");
                return StatusCode(500);
            }
        }

        [HttpPost("googleRegister")]
        public IActionResult GoogleRegister(GoogleSessionRequest request)
        {
            try
            {
                var now = DateTime.Now;
                logger.LogInformation("Request name: " + request.Name);
                logger.LogInformation("Request email: " + request.Email);
                logger.LogInformation("Request picture: " + request.Picture);
                User user = new()
                {
                    Name = request.Name,
                    NRIC = "NotApplic",
                    Email = request.Email,
                    PhoneNumber = 99999999,
                    ImageFile = request.Picture,
                    Password = Guid.NewGuid().ToString(),
                    UserRole = "User",
                    CreatedAt = now,
                    UpdatedAt = now 
                };

                var userAccCheck = dbContext.Users.Where(u => u.Email == request.Email).FirstOrDefault();
                logger.LogInformation("Reached Check 1");
                if (userAccCheck != null)
                {
                    return BadRequest("User Account already exist!");
                }
                logger.LogInformation("Reached Check 2");

                dbContext.Users.Add(user);
                dbContext.SaveChanges();
                logger.LogInformation("Reached Check 3");

                return Ok();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Google Register Occured");
                return StatusCode(500);
            }
        }

        [HttpPost("googleLogin")]
        public IActionResult GoogleLogin(GoogleSessionRequest request)
        {
            try
            {
                string googleAccessToken = CreateGoogleToken(request);

                return Ok(googleAccessToken);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Google Login Failed");
                return StatusCode(500);
            }
        }

        [HttpGet("auth"), Authorize]
        [ProducesResponseType(typeof(IEnumerable<AuthResponse>), StatusCodes.Status200OK)]
        public IActionResult Auth()
        {
            try
            {
                var id = Convert.ToInt32(User.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier).Select(c => c.Value).SingleOrDefault());
                var userRole = User.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).SingleOrDefault();

                if (id != 0)
                {
                    // You can shorten a new statement if the type is already defined
                    UserDTO userDTO = new() { Id = id, UserRole = userRole };
                    AuthResponse response = new() { User = userDTO };

                    return Ok(response);
                }
                else
                {
                    logger.LogInformation($"{id}");
                    return Unauthorized();
                }
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error authenticating user!");
                return StatusCode(500);
            }
        }

        [HttpGet("googleAuth"), Authorize]
        [ProducesResponseType(typeof(IEnumerable<GoogleSessionResponse>), StatusCodes.Status200OK)]
        public IActionResult GoogleAuth()
        {
            try
            {
                var name = User.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier).Select(c => c.Value).SingleOrDefault();
                logger.LogInformation(name.ToString());
                var email = User.Claims.Where(c => c.Type == ClaimTypes.Email).Select(c => c.Value).SingleOrDefault();
                var picture = User.Claims.Where(c => c.Type == ClaimTypes.Uri).Select(c => c.Value).SingleOrDefault();
                var userRole = User.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).SingleOrDefault();

                GoogleSessionResponse response = new()
                {
                    Name = name,
                    Email = email,
                    Picture = picture,
                    UserRole = userRole
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error in authenticating Google Account");
                return StatusCode(500);
            }
        }

        [HttpGet, Authorize]
        [ProducesResponseType(typeof (IEnumerable<UserDTO>), StatusCodes.Status200OK)]
        public IActionResult getUserDetailsSelf()
        {
            var userID = GetUserID();
            var userAccCheck = dbContext.Users.Find(userID);
            if (userAccCheck == null) 
            {
                logger.LogError("Error retrieving account details.");
            }

            User user = new()
            {
                Id = userAccCheck.Id,
                Name = userAccCheck.Name,
                NRIC = userAccCheck.NRIC,
                Email = userAccCheck.Email,
                PhoneNumber = userAccCheck.PhoneNumber,
                ImageFile = userAccCheck.ImageFile,
                UserRole = userAccCheck.UserRole
            };

            var userDTO = mapper.Map<UserDTO>(user);
            return Ok(userDTO);
        }

        [HttpGet("googleAccount"), Authorize]
        [ProducesResponseType(typeof(IEnumerable<UserDTO>), StatusCodes.Status200OK)]
        public IActionResult getUserDetailsGoogleSelf()
        {
            var userEmail = User.Claims.Where(c => c.Type == ClaimTypes.Email).Select(c => c.Value).SingleOrDefault();
            logger.LogInformation("This is the Email" + userEmail);
            var userAccCheck = dbContext.Users.Where(u => u.Email == userEmail).FirstOrDefault();
            if (userAccCheck == null)
            {
                logger.LogInformation(userAccCheck.ToString());
                return BadRequest("Error encountered");
            }

            User user = new()
            {
                Id = userAccCheck.Id,
                Name = userAccCheck.Name,
                NRIC = userAccCheck.NRIC,
                Email = userAccCheck.Email,
                PhoneNumber = userAccCheck.PhoneNumber,
                ImageFile = userAccCheck.ImageFile,
                UserRole = userAccCheck.UserRole
            };

            var userDTO = mapper.Map<UserDTO>(user);
            return Ok(userDTO);
        }


        [HttpGet("{userID}"),  Authorize]
        [ProducesResponseType(typeof (IEnumerable<UserDTO>), StatusCodes.Status200OK)] 
        public IActionResult getUserDetailOther(int userID)
        {
            try
            {
                var userId = userID;
                var userAccCheck = dbContext.Users.Find(userId);
                if (userAccCheck == null)
                {
                    logger.LogError("User account not found.");
                    return StatusCode(500);
                }

                var userDTO = mapper.Map<UserDTO>(userAccCheck);
                return Ok(userDTO);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error in retrieving other User Account. ERRCODE 1003");
                return StatusCode(500);
            }
        }

        [HttpPut("updateUser"), Authorize]
        public IActionResult updateUserDetails(UpdateUserRequest request)
        {
            try
            {
                var userID = GetUserID();
                var userAccCheck = dbContext.Users.Find(userID);

                if (request.ImageFile == null)
                {
                    request.ImageFile = userAccCheck.ImageFile;
                }

                userAccCheck.Name = request.Name.Trim();
                userAccCheck.Email = request.Email.Trim();
                userAccCheck.PhoneNumber = request.PhoneNumber;
                userAccCheck.ImageFile = request.ImageFile;

                dbContext.Users.Update(userAccCheck);
                dbContext.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error in updating user data. ERRCODE 1004");
                return StatusCode(500);
            }
        }

        [HttpPut("google/updateUser"), Authorize]
        public IActionResult updateGoogleUserDetails(UpdateUserRequest request)
        {
            try
            {
                var userAccCheck = dbContext.Users.Where(u => u.Email == request.Email).FirstOrDefault();

                userAccCheck.PhoneNumber = request.PhoneNumber;

                dbContext.Users.Update(userAccCheck);
                dbContext.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error in updating user data. ERRCODE 1004");
                return StatusCode(500);
            }
        }


        [HttpPut("updatePassword"), Authorize]
        public IActionResult updateUserPassword(UpdatePasswordRequest updatePasswordRequest)
        {
            try
            {
                var userID = GetUserID();
                var userAccCheck = dbContext.Users.Find(userID);

                if (updatePasswordRequest.Password.Trim() != updatePasswordRequest.ConfirmPassword.Trim())
                {
                    var message = "Password and Confirmed Password does not match!";
                    return BadRequest(new { message });
                }

                var passwordEncrypt = BCrypt.Net.BCrypt.HashPassword(updatePasswordRequest.Password.Trim());
                userAccCheck.Password = passwordEncrypt;
                dbContext.Users.Update(userAccCheck);
                dbContext.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error in updating user password. ERRCODE 1005");
                return StatusCode(500);
            }
        }

        [HttpPut("google/updatePassword"), Authorize]
        public IActionResult updateGoogleUserPassword(UpdatePasswordRequest updatePasswordRequest)
        {
            try
            {
                var userEmail = User.Claims.Where(c => c.Type == ClaimTypes.Email).Select(c => c.Value).SingleOrDefault();
                var userAccCheck = dbContext.Users.Where(u => u.Email == userEmail).FirstOrDefault();
                if (userAccCheck == null)
                {
                    logger.LogInformation(userAccCheck.ToString());
                    return BadRequest("Error encountered");
                }

                var passwordEncrypt = BCrypt.Net.BCrypt.HashPassword(updatePasswordRequest.Password.Trim());
                userAccCheck.Password = passwordEncrypt;
                dbContext.Users.Update(userAccCheck);
                dbContext.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error in updating google user password.");
                return StatusCode(500);
            }
        }

        [HttpDelete(), Authorize]
        public IActionResult deleteUserDetails()
        {
            try
            {
                var userID = GetUserID();
                var userAccCheck = dbContext.Users.Find(userID);

                dbContext.Users.Remove(userAccCheck);
                dbContext.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error in deleting user account. ERRCODE 1006");
                return StatusCode(500);
            }
        }

        private string CreateToken(User user)
        {
            string secret = configuration.GetValue<string>("Authentication:Secret");
            int tokenExpiresDays = configuration.GetValue<int>("Authentication:TokenExpiresDays");

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secret);

            // What kind of information is stored in the token 
            // Information that is most usually used for authentication/identification
            // https://learn.microsoft.com/en-us/dotnet/api/system.security.claims.claim?view=net-7.0 (For claims understanding)
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                // Subject is the entity (usually a user requesting access to a resource)
                // ClaimsIdentity is a collection of claims that describe the properties and attributes of the subject
                Subject = new ClaimsIdentity(new Claim[]
                {
                    // ClaimTypes give information of what information a particular claim means, e.g. Email = user's Email
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Role, user.UserRole)
                }),
                Expires = DateTime.UtcNow.AddDays(tokenExpiresDays),
                // Specifies the signing key, signing key identifier, and security algorithms to generate a digital signature for SamlAssertion
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var securityToken = tokenHandler.CreateToken(tokenDescriptor);
            string token = tokenHandler.WriteToken(securityToken);

            return token;
        }

        private string CreateGoogleToken(GoogleSessionRequest request)
        {
            string secret = configuration.GetValue<string>("Authentication:Secret");
            int tokenExpiresDays = configuration.GetValue<int>("Authentication:TokenExpiresDays");

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secret);

            // What kind of information is stored in the token 
            // Information that is most usually used for authentication/identification
            // https://learn.microsoft.com/en-us/dotnet/api/system.security.claims.claim?view=net-7.0 (For claims understanding)
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                // Subject is the entity (usually a user requesting access to a resource)
                // ClaimsIdentity is a collection of claims that describe the properties and attributes of the subject
                Subject = new ClaimsIdentity(new Claim[]
                {
                    // ClaimTypes give information of what information a particular claim means, e.g. Email = user's Email
                    new Claim(ClaimTypes.NameIdentifier, request.Name),
                    new Claim(ClaimTypes.Email, request.Email),
                    new Claim(ClaimTypes.Uri, request.Picture),
                    new Claim(ClaimTypes.Role, "User")
                }),
                Expires = DateTime.UtcNow.AddDays(tokenExpiresDays),
                // Specifies the signing key, signing key identifier, and security algorithms to generate a digital signature for SamlAssertion
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var securityToken = tokenHandler.CreateToken(tokenDescriptor);
            string token = tokenHandler.WriteToken(securityToken);

            return token;
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
