using EnterpriseDevProj.Models.UserFolder;

namespace EnterpriseDevProj.Models.MembershipFolder
{
    public class Membership
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public User? User { get; set; }

        public string MembershipStatus { get; set; } = string.Empty;
    }
}
