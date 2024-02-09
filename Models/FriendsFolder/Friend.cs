using EnterpriseDevProj.Models.UserFolder;

namespace EnterpriseDevProj.Models.FriendsFolder
{
    public class Friend
    {
        public int Id { get; set; }

        public int FromUser { get; set; }

        public int ToUser { get; set; }

        public bool RequestApproved { get; set; }

        public int UserId { get; set; }

        public User? User { get; set; }
    }
}
