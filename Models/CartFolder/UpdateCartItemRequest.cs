using System.ComponentModel.DataAnnotations;

namespace EnterpriseDevProj.Models.CartFolder
{
    public class UpdateCartItemRequest
    {
        [Required]
        public float SubTotal { get; set; }
        [Required]
        public int Quantity { get; set; }
    }
}
