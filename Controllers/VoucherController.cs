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
        private readonly ILogger<VoucherController> logger;
        private readonly IConfiguration configuration;
        private readonly IMapper mapper;

        public VoucherController(MyDbContext dbContext, ILogger<VoucherController> logger, IConfiguration configuration, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.logger = logger;
            this.configuration = configuration;
            this.mapper = mapper;
        }

        [HttpPost("VoucherCreate")]
        public IActionResult VoucherCreate(CreateVoucherRequest createVoucherRequest)
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
                    VoucherExpiry = now,
                    CreatedAt = now,
                    UpdatedAt = now,
                };

                dbContext.Vouchers.Add(newVoucher);
                dbContext.SaveChanges();
                return Ok();
            } 
            catch (Exception e)
            {
                logger.LogError(e, "Failed to create voucher. Troubleshoot the abovementioned error(s) and try again.");
                return StatusCode(500);
            }
        }

        [HttpGet("VoucherGetAll")]
        public IActionResult VoucherGetAll()
        {
            var allVouchers = dbContext.Vouchers.ToList();
            return Ok(allVouchers);
        }

        [HttpPut("{voucherID}")]
        public IActionResult VoucherUpdate(int voucherID, CreateVoucherRequest req)
        {
            try
            {
                DateTime now = DateTime.Now;
                int vid = voucherID;
                var voucherToUpdate = dbContext.Vouchers.Find(vid);

                voucherToUpdate.VoucherName = req.VoucherName;
                voucherToUpdate.VoucherValue = req.VoucherValue;
                voucherToUpdate.VoucherUses = req.VoucherUses;
                voucherToUpdate.VoucherExpiry = now;
                voucherToUpdate.UpdatedAt = now;

                dbContext.Update(voucherToUpdate);
                dbContext.SaveChanges();
                return Ok();
            }
            catch (Exception e)
            {
                logger.LogError(e, "Failed to update voucher details. Troubleshoot the abovementioned error(s) and try again.");
                return StatusCode(500);
            }
        }

        [HttpDelete("deleteVoucher")] // Unsure if 2 delete endpoints are needed
        public IActionResult VoucherDelete(int voucherID)
        {
            try
            {
                int vid = voucherID;
                var voucherToDelete = dbContext.Vouchers.Find(vid);

                dbContext.Vouchers.Remove(voucherToDelete);
                dbContext.SaveChanges();

                return Ok();
            }
            catch (Exception e)
            {
                logger.LogError(e, "Failed to delete voucher. Troubleshoot the abovementioned error(s) and try again.");
                return StatusCode(500);
            }
        }
    }
}
