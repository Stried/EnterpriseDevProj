using EnterpriseDevProj.Models.EventFolder;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EnterpriseDevProj.Models.CartFolder
{
    public class CartItem
    { 
        public int CartItemId { get; set; }
        [Required]
        public float SubTotal { get; set; }
        [Required]
        public int Quantity { get; set; }
        public int CartId { get; set; }
        public int EventId { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime CreatedAt { get; set; }
        
        [Column(TypeName = "datetime")]
        public DateTime UpdatedAt { get; set; }
        public Cart? Cart { get; set; }
        public Event? Event { get; set; }
        public List<CartParticipant>? Participants { get; set; }
    }
}