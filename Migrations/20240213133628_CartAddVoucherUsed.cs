using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EnterpriseDevProj.Migrations
{
    /// <inheritdoc />
    public partial class CartAddVoucherUsed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "VoucherUsed",
                table: "Carts",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "VoucherUsed",
                table: "Carts");
        }
    }
}
