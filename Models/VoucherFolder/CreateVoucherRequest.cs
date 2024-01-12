using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EnterpriseDevProj.Models.VoucherFolder
{
    public class CreateVoucherRequest
    {
        [Required, StringLength(5, MinimumLength = 5)]
        public string VoucherName { get; set; } = string.Empty;

        [Required, Range(5, 100)]
        public int VoucherValue { get; set; }

        [Required, Range(5, 10000)]
        public int VoucherUses { get; set; }

        [Required, Column(TypeName = "datetime")]
        public DateTime VoucherExpiry { get; set; }
    }
}
