using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NanoidDotNet;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

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

        [HttpPost("upload"), Authorize]
        public IActionResult Upload(List<IFormFile> files)
        {
            var uploadedFiles = new List<string>();

            foreach (var file in files)
            {
                if (file.Length > 2048 * 2048)
                {
                    var message = "Maximum file size is 2MB";
                    return BadRequest(new { message });
                }

                var id = Nanoid.Generate(size: 10);
                var fileName = id + Path.GetExtension(file.FileName);
                var imagePath = Path.Combine(environment.ContentRootPath, @"/EDPWeb", fileName);

                using var fileStream = new FileStream(imagePath, FileMode.Create);
                file.CopyTo(fileStream);

                uploadedFiles.Add(fileName);
            }

            return Ok(new { files = uploadedFiles });
        }
    }
}