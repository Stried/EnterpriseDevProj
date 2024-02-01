using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EnterpriseDevProj.Models.VoucherFolder
{
    public class CreateVoucherRequest
    {
        [Required, MinLength(5), MaxLength(30)]
        public string VoucherName { get; set; } = string.Empty;

        [Required, Range(5, 100)]
        public int VoucherValue { get; set; }

        [Required, Range(5, 10000)]
        public int VoucherUses { get; set; }

        //[Required, Column(TypeName = "datetime")]
        [Required]
        public string VoucherExpiry { get; set; }
    }
}
