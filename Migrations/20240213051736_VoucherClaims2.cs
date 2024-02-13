using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EnterpriseDevProj.Migrations
{
    /// <inheritdoc />
    public partial class VoucherClaims2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "VoucherClaims",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_VoucherClaims_UserId",
                table: "VoucherClaims",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_VoucherClaims_Users_UserId",
                table: "VoucherClaims",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VoucherClaims_Users_UserId",
                table: "VoucherClaims");

            migrationBuilder.DropIndex(
                name: "IX_VoucherClaims_UserId",
                table: "VoucherClaims");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "VoucherClaims");
        }
    }
}
