using AutoMapper;
using EnterpriseDevProj.Models.CartFolder;
using EnterpriseDevProj.Models.EventFolder;
using EnterpriseDevProj.Models.UserFolder;

namespace EnterpriseDevProj
{
    public class MappingProfile : Profile
    {
        public MappingProfile() 
        {
            CreateMap<Event, EventDTO>();
            CreateMap<User, UserDTO>();
            CreateMap<Cart, CartDTO>();
            CreateMap<CartItem, CartItemDTO>();
            CreateMap<CartParticipant, CartParticipantDTO>();
        }
    }
}
