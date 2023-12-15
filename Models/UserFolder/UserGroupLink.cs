using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EnterpriseDevProj.Models.UserFolder
{
    public class UserGroupLink
    {
        public int Id { get; set; }

        public int UserID { get; set; }

        public int GroupID { get; set; }

        [Required]
        public User? User { get; set; }

        public UserGroup? UserGroup { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime CreatedAt { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime UpdatedAt { get; set; }
    }
}
