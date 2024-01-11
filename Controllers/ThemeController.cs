using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EnterpriseDevProj.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ThemeController : ControllerBase
    {
        private readonly MyDbContext dbContext;
        private readonly ILogger<ThemeController> logger;
        private readonly IConfiguration configuration;
        private readonly IMapper mapper;

        public ThemeController(MyDbContext dbContext, ILogger<ThemeController> logger, IConfiguration configuration, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.logger = logger;
            this.configuration = configuration;
            this.mapper = mapper;
        }

        [HttpGet("{id}"), Authorize]
        public ActionResult GetTheme(int id)
        {
            try
            {
                var themeID = id;
                var theme = dbContext.Themes.Find(id);
                if (theme == null)
                {
                    logger.LogError("Theme not found!");
                    return StatusCode(500);
                }

                return Ok(theme);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error in retrieving Theme. ERRCODE 2001");
                return StatusCode(500);
            }
        }
    }
}
