using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EnterpriseDevProj.Migrations
{
    /// <inheritdoc />
    public partial class dropLinkTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserGroups_Users_UserId",
                table: "UserGroups");

            migrationBuilder.DropTable(
                name: "UserGroupLinks");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "UserGroups",
                newName: "UserID");

            migrationBuilder.RenameIndex(
                name: "IX_UserGroups_UserId",
                table: "UserGroups",
                newName: "IX_UserGroups_UserID");

            migrationBuilder.AlterColumn<int>(
                name: "UserID",
                table: "UserGroups",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_UserGroups_Users_UserID",
                table: "UserGroups",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserGroups_Users_UserID",
                table: "UserGroups");

            migrationBuilder.RenameColumn(
                name: "UserID",
                table: "UserGroups",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_UserGroups_UserID",
                table: "UserGroups",
                newName: "IX_UserGroups_UserId");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "UserGroups",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateTable(
                name: "UserGroupLinks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserGroupId = table.Column<int>(type: "int", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserGroupLinks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserGroupLinks_UserGroups_UserGroupId",
                        column: x => x.UserGroupId,
                        principalTable: "UserGroups",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_UserGroupLinks_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_UserGroupLinks_UserGroupId",
                table: "UserGroupLinks",
                column: "UserGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_UserGroupLinks_UserId",
                table: "UserGroupLinks",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserGroups_Users_UserId",
                table: "UserGroups",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
