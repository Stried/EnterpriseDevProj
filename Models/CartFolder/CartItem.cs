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
        public int DateId { get; set; }
        [Required]
        public int EventPrice {get; set;}		
        [Required, MinLength(3), MaxLength(60)]
		public string EventName { get; set; } = string.Empty;
        [Required]
        [Column(TypeName = "datetime")]
        public DateTime DateOfEvent { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime CreatedAt { get; set; }
        
        [Column(TypeName = "datetime")]
        public DateTime UpdatedAt { get; set; }
        public Cart? Cart { get; set; }
        public Date? Dates {get; set;}
        public List<CartParticipant>? Participants { get; set; }
    }
}