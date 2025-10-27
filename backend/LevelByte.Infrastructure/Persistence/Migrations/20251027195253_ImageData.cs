using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LevelByte.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class ImageData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageContentType",
                table: "Articles",
                type: "character varying(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "ImageData",
                table: "Articles",
                type: "bytea",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageContentType",
                table: "Articles");

            migrationBuilder.DropColumn(
                name: "ImageData",
                table: "Articles");
        }
    }
}
