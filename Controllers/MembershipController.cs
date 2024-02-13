using Microsoft.AspNetCore.Mvc;

namespace EnterpriseDevProj.Controllers
{
    public class MembershipController : ControllerBase
    {
        private MyDbContext _context;
        private ILogger<MembershipController> _logger;

        public MembershipController(MyDbContext context, ILogger<MembershipController> logger)
        {
            _context = context;
            _logger = logger;
        }

        
    }
}
