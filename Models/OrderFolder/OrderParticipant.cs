using EnterpriseDevProj.Models.CartFolder;
using System.ComponentModel.DataAnnotations.Schema;

namespace EnterpriseDevProj.Models.OrderFolder
{
    public class OrderParticipant
    {
        public int OrderParticipantId { get; set; }
        public string OrderParticipantName { get; set; } = string.Empty;
        public int OrderParticipantPhoneNumber { get; set; }
        public string OrderParticipantEmail { get; set; } = string.Empty;
        public int OrderItemId { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime CreatedAt { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime UpdatedAt { get; set; }
        public OrderItem? OrderItem { get; set; }
    }
}
