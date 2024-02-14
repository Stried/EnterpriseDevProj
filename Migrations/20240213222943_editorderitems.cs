using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EnterpriseDevProj.Migrations
{
    /// <inheritdoc />
    public partial class editorderitems : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderItems_Events_EventId",
                table: "OrderItems");

            migrationBuilder.DropIndex(
                name: "IX_OrderItems_EventId",
                table: "OrderItems");

            migrationBuilder.AddColumn<int>(
                name: "DateId",
                table: "OrderItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "DateOfEvent",
                table: "OrderItems",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "EventName",
                table: "OrderItems",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<int>(
                name: "EventPrice",
                table: "OrderItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_DateId",
                table: "OrderItems",
                column: "DateId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItems_Dates_DateId",
                table: "OrderItems",
                column: "DateId",
                principalTable: "Dates",
                principalColumn: "DateId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderItems_Dates_DateId",
                table: "OrderItems");

            migrationBuilder.DropIndex(
                name: "IX_OrderItems_DateId",
                table: "OrderItems");

            migrationBuilder.DropColumn(
                name: "DateId",
                table: "OrderItems");

            migrationBuilder.DropColumn(
                name: "DateOfEvent",
                table: "OrderItems");

            migrationBuilder.DropColumn(
                name: "EventName",
                table: "OrderItems");

            migrationBuilder.DropColumn(
                name: "EventPrice",
                table: "OrderItems");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_EventId",
                table: "OrderItems",
                column: "EventId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItems_Events_EventId",
                table: "OrderItems",
                column: "EventId",
                principalTable: "Events",
                principalColumn: "EventId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
