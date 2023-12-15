using AutoMapper;
using EnterpriseDevProj.Models.UserFolder;

namespace EnterpriseDevProj
{
    public class MappingProfile : Profile
    {
        public MappingProfile() 
        {
            CreateMap<User, UserDTO>();
        }
    }
}
