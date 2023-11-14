using System.ComponentModel.DataAnnotations;

namespace EnterpriseDevProj.Models
{
    public class UserGroup
    {
        public int Id { get; set; }

        [Required, MinLength(2), MaxLength(50)]
        public string GroupName { get; set; } = string.Empty;

        [Required]
        public string GroupMembers { get; set; } = string.Empty;  // "{ {key1, value1}, {key2, value2}, {key3, value3} }" 8 max

        public User? User { get; set; }
    }
}
