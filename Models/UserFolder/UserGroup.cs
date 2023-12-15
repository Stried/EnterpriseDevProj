using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EnterpriseDevProj.Models.UserFolder
{
    public class UserGroup
    {
        public int Id { get; set; }

        [Required, MinLength(2), MaxLength(50)]
        public string GroupName { get; set; } = string.Empty;

        [Column(TypeName = "datetime")]
        public DateTime CreatedAt { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime UpdatedAt { get; set; }

        public int UserID { get; set; }

        public User? User { get; set; }
    }
}
