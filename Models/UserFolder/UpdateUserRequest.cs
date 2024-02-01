using System.ComponentModel.DataAnnotations;

namespace EnterpriseDevProj.Models.UserFolder
{
    public class UpdateUserRequest
    {
        [Required, MinLength(3), MaxLength(50)]
        public string Name { get; set; } = string.Empty;

        [Required, MinLength(3), MaxLength(100), EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required, Range(80000000, 99999999)]
        public int PhoneNumber { get; set; }

        public string imageFile { get; set; } = string.Empty;
    }
}
