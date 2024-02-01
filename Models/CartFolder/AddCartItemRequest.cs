using System.ComponentModel.DataAnnotations;

namespace EnterpriseDevProj.Models.CartFolder
{
    public class AddCartItemRequest
    {
        [Required]
        public int Quantity { get; set; }
        public int CartId { get; set; }
        public int EventId { get; set; }
    }
}
