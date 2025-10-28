using Microsoft.AspNetCore.Http;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using System.IO;

namespace LevelByte.Application.Validators
{
    public static class ImageValidator
    {
        private static readonly string[] AllowedExtensions = { ".jpg", ".jpeg", ".png", ".gif", ".webp" };
        private static readonly string[] AllowedMimeTypes = { "image/jpeg", "image/png", "image/gif", "image/webp" };
        private const long MaxFileSizeInBytes = 5 * 1024 * 1024;

        public static (bool IsValid, string? ErrorMessage) ValidateImage(IFormFile? image)
        {
            if (image == null)
                return (true, null);

            if (image.Length > MaxFileSizeInBytes)
                return (false, $"Image size must be less than {MaxFileSizeInBytes / (1024 * 1024)}MB");

            if (image.Length == 0)
                return (false, "Image file is empty");

            var extension = Path.GetExtension(image.FileName).ToLowerInvariant();
            if (!AllowedExtensions.Contains(extension))
                return (false, $"Only {string.Join(", ", AllowedExtensions)} files are allowed");

            if (!AllowedMimeTypes.Contains(image.ContentType.ToLowerInvariant()))
                return (false, $"Invalid image format. Allowed formats: {string.Join(", ", AllowedMimeTypes)}");

            return (true, null);
        }

        public static async Task<(byte[] Data, string ContentType)> ProcessImage(IFormFile image)
        {
            var validation = ValidateImage(image);
            if (!validation.IsValid)
                throw new InvalidOperationException(validation.ErrorMessage);

            using var memoryStream = new MemoryStream();
            await image.CopyToAsync(memoryStream);
            memoryStream.Position = 0;

            using var originalImage = await Image.LoadAsync(memoryStream);
            originalImage.Mutate(x => x.Resize(new ResizeOptions
            {
                Size = new Size(800, 450),
                Mode = ResizeMode.Crop
            }));

            using var outputStream = new MemoryStream();
            var extension = Path.GetExtension(image.FileName).ToLowerInvariant();

            if (extension == ".png")
                await originalImage.SaveAsPngAsync(outputStream);
            else if (extension == ".webp")
                await originalImage.SaveAsWebpAsync(outputStream);
            else
                await originalImage.SaveAsJpegAsync(outputStream);

            return (outputStream.ToArray(), image.ContentType);
        }
    }
}
