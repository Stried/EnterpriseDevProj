using EnterpriseDevProj.Models.UserFolder;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EnterpriseDevProj.Models.TicketFolder
{
    public class Comment
    {
        public int Id { get; set; }

        [Required, MinLength(3), MaxLength(500)]
        public string CommentBody { get; set; } = string.Empty;

        public int TicketId { get; set; }
        public Ticket? Ticket { get; set; }

        public int UserId { get; set; }
        public User? User { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime CreatedAt { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime UpdatedAt { get; set; }

    }
}
