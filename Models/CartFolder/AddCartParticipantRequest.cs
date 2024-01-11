using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace EnterpriseDevProj.Models.CartFolder
{
    public class AddCartParticipantRequest
    {
        public string CartParticipantName { get; set; } = string.Empty;
        public int CartParticipantPhone { get; set; }
        public string CartParticipantEmail { get; set; } = string.Empty;
        public DateOnly DateOfBirth { get; set; }
        public int CartItemId { get; set; }
    }
}
