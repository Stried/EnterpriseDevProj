using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EnterpriseDevProj.Models.VoucherFolder
{
    public class Voucher
    {
        public int Id { get; set; }

        [Required, Range(5, 100)]
        public int VoucherValue { get; set; }

        [Required, StringLength(5, MinimumLength = 5)]
        public string VoucherName { get; set; } = string.Empty;

        [Required, Range(5, 10000)]
        public int VoucherUses { get; set; }
        
        [Required, Column (TypeName = "datetime")]
        public DateTime VoucherExpiry { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime CreatedAt { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime UpdatedAt { get; set; }

        // Get Vouchers
        // Create Vouchers
        // Delete Vouchers (on expiry/quantity-out)
        // Update Voucher Details
        // (ADMIN) Search Vouchers
    }
}
