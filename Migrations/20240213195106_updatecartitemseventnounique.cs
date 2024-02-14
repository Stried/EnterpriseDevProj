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


        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

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
