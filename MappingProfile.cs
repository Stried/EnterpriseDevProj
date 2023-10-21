using AutoMapper;
using EnterpriseDevProj.Models;

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
