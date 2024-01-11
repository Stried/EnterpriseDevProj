using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EnterpriseDevProj.Models.CartFolder
{
    public class UpdateCartParticipantRequest
    {
        [Required, MinLength(3), MaxLength(100)]
        public string CartParticipantName { get; set; } = string.Empty;
        [Required, Range(80000000, 99999999)]
        public int CartParticipantPhone { get; set; }
        [Required, MinLength(3), MaxLength(100), EmailAddress]
        public string CartParticipantEmail { get; set; } = string.Empty;
        [Column(TypeName = "date")]
        public DateOnly DateOfBirth { get; set; }
    }
}
