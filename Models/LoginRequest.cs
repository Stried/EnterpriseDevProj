using System.ComponentModel.DataAnnotations;

namespace EnterpriseDevProj.Models
{
    public class LoginRequest
    {
        [Required, EmailAddress, MinLength(3), MaxLength(100)]
        public string Email { get; set; } = string.Empty;

        [Required, MinLength(8), MaxLength(100)]
        public string Password { get; set; } = string.Empty;
    }
}
