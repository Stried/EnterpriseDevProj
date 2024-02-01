using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NanoidDotNet;

namespace EnterpriseDevProj.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FileController : ControllerBase
    {
        private readonly IWebHostEnvironment environment;

        public FileController(IWebHostEnvironment environment)
        {
            this.environment = environment;
        }

        [HttpPost("upload")]
        public IActionResult Upload(IFormFile file)
        {
            if (file.Length > 2048 * 2048)
            {
                var message = "Maximum file size is 2MB";
                return BadRequest(new { message });
            }

            var id = Nanoid.Generate(size: 10);
            var fileName = id + Path.GetExtension(file.FileName);
            var imagePath = Path.Combine(environment.ContentRootPath, @"wwwroot/images", fileName);
            using var fileStream = new FileStream(imagePath, FileMode.Create);
            file.CopyTo(fileStream);

            return Ok(new { fileName });
        }
    }
}
