using EnterpriseDevProj.Models.UserFolder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection.Metadata;

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
    }
}

