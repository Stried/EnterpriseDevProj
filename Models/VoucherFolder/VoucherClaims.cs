using EnterpriseDevProj.Models.UserFolder;

namespace EnterpriseDevProj.Models.VoucherFolder
{
    public class VoucherClaims
    {
        public int Id {  get; set; }

        public int VoucherId { get; set; }
        public Voucher? Voucher { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public bool isUsed { get; set; }
    }
}
