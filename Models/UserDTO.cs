namespace EnterpriseDevProj.Models
{
    public class UserDTO
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string NRIC { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public int PhoneNumber { get; set; }

        public string UserRole { get; set; } = string.Empty;
    }
}
