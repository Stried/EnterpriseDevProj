using EnterpriseDevProj.Models.UserFolder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection.Metadata;
using EnterpriseDevProj.Models.EventFolder;
using EnterpriseDevProj.Models.Miscellaneous;
using EnterpriseDevProj.Models.CartFolder;
using EnterpriseDevProj.Models.VoucherFolder;
using EnterpriseDevProj.Models.TicketFolder;
using EnterpriseDevProj.Models.FriendsFolder;
using EnterpriseDevProj.Models.OrderFolder;
using EnterpriseDevProj.Models.MembershipFolder;
namespace EnterpriseDevProj
{
    public class MyDbContext : DbContext    
    {
        private readonly IConfiguration configuration;

        public MyDbContext(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            string? connectionString = configuration.GetConnectionString("MyConnection"); // MyConnection is set up in the appsettings.json
            if (connectionString != null)
            {
                // package: MySQL.Data.EntityFrameworkCore changed to Pomelo.EntityFrameworkCore.MySql
                // Check with the teacher the error: 
                // "Method 'Create' in type 'MySql.Data.EntityFrameworkCore.Query.Internal.MySQLSqlTranslatingExpressionVisitorFactory'
                // from assembly 'MySql.Data.EntityFrameworkCore, Version=8.0.22.0, Culture=neutral, PublicKeyToken=c2687fc88969c44d' does not have an implementation.

                optionsBuilder.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
            }
        }

        public DbSet<User> Users { get; set; }

        public DbSet<UserGroup> UserGroups { get; set; }

        public DbSet<UserGroupLink> UserGroupLinks { get; set; }

        public DbSet<Membership> Memberships { get; set; }

        public DbSet<Friend> Friends { get; set; }

        public DbSet<Theme> Themes { get; set; }

        public DbSet<Event> Events { get; set; }

		public DbSet<Date> Dates { get; set; }

		public DbSet<Cart> Carts { get; set; }

        public DbSet<CartItem> CartItems {  get; set; }

        public DbSet<CartParticipant> CartParticipants { get; set; }

        public DbSet<Voucher> Vouchers { get; set; }

        public DbSet<VoucherClaims> VoucherClaims { get; set; }

        public DbSet<Ticket> Tickets { get; set; }

        public DbSet<Comment> Comments { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<OrderParticipant> OrdersParticipants { get; set; }
    }
}

