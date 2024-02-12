using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EnterpriseDevProj.Migrations
{
    /// <inheritdoc />
    public partial class orderChanges3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
               name: "Orders",
               columns: table => new
               {
                   OrderId = table.Column<int>(type: "int", nullable: false)
                       .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                   CustomerName = table.Column<string>(type: "longtext", nullable: false)
                       .Annotation("MySql:CharSet", "utf8mb4"),
                   CustomerEmail = table.Column<string>(type: "longtext", nullable: false)
                       .Annotation("MySql:CharSet", "utf8mb4"),
                   CustomerPhone = table.Column<string>(type: "longtext", nullable: false)
                       .Annotation("MySql:CharSet", "utf8mb4"),
                   CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                   UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                   UserId = table.Column<int>(type: "int", nullable: false)
               },
               constraints: table =>
               {
                   table.PrimaryKey("PK_Orders", x => x.OrderId);
                   table.ForeignKey(
                       name: "FK_Orders_Users_UserId",
                       column: x => x.UserId,
                       principalTable: "Users",
                       principalColumn: "Id",
                       onDelete: ReferentialAction.Cascade);
               })
               .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "OrderItems",
                columns: table => new
                {
                    OrderItemId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    SubTotal = table.Column<float>(type: "float", nullable: false),
                    EventId = table.Column<int>(type: "int", nullable: false),
                    OrderId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderItems", x => x.OrderItemId);
                    table.ForeignKey(
                        name: "FK_OrderItems_Events_EventId",
                        column: x => x.EventId,
                        principalTable: "Events",
                        principalColumn: "EventId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderItems_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "OrderId");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "OrdersParticipants",
                columns: table => new
                {
                    OrderParticipantId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    OrderParticipantName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    OrderParticipantPhoneNumber = table.Column<int>(type: "int", nullable: false),
                    OrderParticipantEmail = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    OrderItemId = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrdersParticipants", x => x.OrderParticipantId);
                    table.ForeignKey(
                        name: "FK_OrdersParticipants_OrderItems_OrderItemId",
                        column: x => x.OrderItemId,
                        principalTable: "OrderItems",
                        principalColumn: "OrderItemId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_EventId",
                table: "OrderItems",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_OrderId",
                table: "OrderItems",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_UserId",
                table: "Orders",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_OrdersParticipants_OrderItemId",
                table: "OrdersParticipants",
                column: "OrderItemId");

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_OrderItems_EventId",
                table: "OrderItems");

            migrationBuilder.DropIndex(
                name: "IX_CartItems_EventId",
                table: "CartItems");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_EventId",
                table: "OrderItems",
                column: "EventId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CartItems_EventId",
                table: "CartItems",
                column: "EventId",
                unique: true);
        }
    }
}
