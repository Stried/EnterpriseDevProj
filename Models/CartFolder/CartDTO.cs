using EnterpriseDevProj.Models.UserFolder;

namespace EnterpriseDevProj.Models.CartFolder
{
    public class CartDTO
    {
        public int CartId { get; set; }
        public int CartRoute { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public UserDTO? User { get; set; }
        public List<CartItemDTO>? CartItems { get; set; }
    }
}
