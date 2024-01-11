using EnterpriseDevProj.Models.UserFolder;
using System.ComponentModel.DataAnnotations.Schema;

namespace EnterpriseDevProj.Models.CartFolder
{
    public class Cart
    {
        public int CartId { get; set; }
        public int UserId {  get; set; }

        [Column(TypeName = "datetime")]
        public DateTime CreatedAt { get; set; }
        
        [Column(TypeName = "datetime")]
        public DateTime UpdatedAt { get; set; }
        public User? User { get; set; }
        public List<CartItem>? CartItems { get; set; }
    }
}