using EnterpriseDevProj.Models.UserFolder;
using System.ComponentModel.DataAnnotations;

namespace EnterpriseDevProj.Models.TicketFolder
{
    public class Comment
    {
        public int Id { get; set; }

        [Required, MinLength(3), MaxLength(100)]
        public string CommentBody { get; set; } = string.Empty;

        public int TicketId { get; set; }
        public Ticket? Ticket { get; set; }

        public int UserId { get; set; }
        public User? User { get; set; }
    }
}
