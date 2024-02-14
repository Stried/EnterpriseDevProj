using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EnterpriseDevProj.Migrations
{
    /// <inheritdoc />
    public partial class updatecartitemseventnounique : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CartItems_Events_EventId",
                table: "CartItems");

            migrationBuilder.DropIndex(
                name: "IX_CartItems_DateId",
                table: "CartItems");

            migrationBuilder.DropIndex(
                name: "IX_CartItems_EventId",
                table: "CartItems");

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_CartItems_DateId",
                table: "CartItems");

            migrationBuilder.CreateIndex(
                name: "IX_CartItems_EventId",
                table: "CartItems",
                column: "EventId");

            migrationBuilder.AddForeignKey(
                name: "FK_CartItems_Events_EventId",
                table: "CartItems",
                column: "EventId",
                principalTable: "Events",
                principalColumn: "EventId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
