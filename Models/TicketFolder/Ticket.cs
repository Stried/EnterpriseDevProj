using EnterpriseDevProj.Models.UserFolder;
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
        [Required, MinLength(5), MaxLength(5000)]
        public string TicketBody { get; set; } = string.Empty;
        [Required]
        public string TicketStatus { get; set; } = string.Empty; // Open, Closed, Pending, Not Solving, Unfixable
        [EmailAddress]
        public string SenderEmail { get; set; } = string.Empty; // Optional - defaults to user email
        [Required]
        public string AttachedFilename { get; set; } = string.Empty;
        public int UserId { get; set; }
        public User? User { get; set; }

        [Column (TypeName = "datetime")]
        public DateTime CreatedAt { get; set; }
        [Column (TypeName = "datetime")]
        public DateTime UpdatedAt { get; set; }

    }
}
