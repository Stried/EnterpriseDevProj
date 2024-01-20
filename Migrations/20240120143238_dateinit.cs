using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EnterpriseDevProj.Migrations
{
    /// <inheritdoc />
    public partial class dateinit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Dates",
                columns: table => new
                {
                    DateId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    EventName = table.Column<string>(type: "varchar(60)", maxLength: 60, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DateOfEvent = table.Column<DateTime>(type: "datetime", nullable: false),
                    DateCreatedAt = table.Column<DateTime>(type: "datetime", nullable: false),
                    DateUpdatedAt = table.Column<DateTime>(type: "datetime", nullable: false),
                    EventId = table.Column<int>(type: "int", nullable: false),
                    CartItemId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dates", x => x.DateId);
                    table.ForeignKey(
                        name: "FK_Dates_CartItems_CartItemId",
                        column: x => x.CartItemId,
                        principalTable: "CartItems",
                        principalColumn: "CartItemId");
                    table.ForeignKey(
                        name: "FK_Dates_Events_EventId",
                        column: x => x.EventId,
                        principalTable: "Events",
                        principalColumn: "EventId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Dates_CartItemId",
                table: "Dates",
                column: "CartItemId");

            migrationBuilder.CreateIndex(
                name: "IX_Dates_EventId",
                table: "Dates",
                column: "EventId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Dates");
        }
    }
}
