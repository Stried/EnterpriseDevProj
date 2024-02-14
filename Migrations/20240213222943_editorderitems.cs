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
