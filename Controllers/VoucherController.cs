using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using EnterpriseDevProj.Models.VoucherFolder;

namespace EnterpriseDevProj.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VoucherController : ControllerBase
    {
        private readonly MyDbContext dbContext;
        private readonly ILogger<UserController> logger;
        private readonly IConfiguration configuration;
        private readonly IMapper mapper;

        public VoucherController(MyDbContext dbContext, ILogger<UserController> logger, IConfiguration configuration, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.logger = logger;
            this.configuration = configuration;
            this.mapper = mapper;
        }

        [HttpPost("VoucherCreate")]
        public IActionResult CreateVoucher(CreateVoucherRequest createVoucherRequest)
        {
            try
            {
                var now = DateTime.Now;

                createVoucherRequest.VoucherName = createVoucherRequest.VoucherName.Trim();

                Voucher newVoucher = new()
                {
                    VoucherName = createVoucherRequest.VoucherName,
                    VoucherValue = createVoucherRequest.VoucherValue,
                    VoucherUses = createVoucherRequest.VoucherUses,
                    VoucherExpiry = createVoucherRequest.VoucherExpiry,
                    CreatedAt = now,
                    UpdatedAt = now,
                };

                dbContext.Vouchers.Add(newVoucher);
                dbContext.SaveChanges();
                return Ok();
            } 

            catch (Exception e)
            {
                logger.LogError(e, "Fail. Try again.");
                return StatusCode(500);
            }
        }

    }
}
