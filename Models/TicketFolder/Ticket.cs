using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EnterpriseDevProj.Models.TicketFolder
{
    public class Ticket
    {
        public int Id { get; set; }
        [Required]
        public string TicketCategory { get; set; } = string.Empty;
        [Required, MinLength(5), MaxLength(50)]
        public string TicketHeader { get; set; } = string.Empty;
        [Required, MinLength(5), MaxLength(500)]
        public string TicketBody { get; set; } = string.Empty;
        [Required]
        public string TicketStatus { get; set; } = string.Empty; // Open, Closed, Pending, Not Solving, Unfixable
        [Required, EmailAddress]
        public string SenderEmail { get; set; } = string.Empty;
        [Required]
        public string AttachedFilename { get; set; } = string.Empty;
        [Column (TypeName = "datetime")]
        public DateTime CreatedAt { get; set; }
        [Column (TypeName = "datetime")]
        public DateTime UpdatedAt { get; set; }

    }
}
