using System.ComponentModel.DataAnnotations;

namespace EnterpriseDevProj.Models.UserFolder
{
    public class RegisterRequest
    {
        [Required, MinLength(3), MaxLength(50)]
        public string Name { get; set; } = string.Empty;

        [Required, StringLength(9, MinimumLength = 9)]
        public string NRIC { get; set; } = string.Empty;

        [Required, MinLength(3), MaxLength(100), EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required, Range(80000000, 99999999)]
        public int PhoneNumber { get; set; }

        public string ImageFile { get; set; } = string.Empty;

        [Required, MaxLength(100)]
        public string Password { get; set; } = string.Empty;

        [Required]
        public string UserRole { get; set; } = string.Empty;
    }
}
