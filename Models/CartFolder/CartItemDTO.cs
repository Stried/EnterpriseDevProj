using EnterpriseDevProj.Models.EventFolder;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace EnterpriseDevProj.Models.CartFolder
{
    public class CartItemDTO
    {
        public int CartItemId { get; set; }
        public float SubTotal { get; set; }
        public int Quantity { get; set; }
        public int CartId { get; set; }
        public int EventPrice {get; set;}
        public string EventName {get; set;} = string.Empty;
        public int DateId {get; set;}
        public DateTime DateOfEvent { get; set; }
        public int EventId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public CartDTO? Cart { get; set; }
        public List<CartParticipantDTO>? Participants { get; set; }
    }
}
