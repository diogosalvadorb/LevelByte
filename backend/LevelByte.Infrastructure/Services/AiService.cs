using Amazon;
using Amazon.S3;
using Amazon.S3.Model;
using LevelByte.Core.Services;
using LevelByte.Infrastructure.Services.Models;
using Microsoft.Extensions.Configuration;
using System.Text;
using System.Text.Json;

namespace LevelByte.Application.Services
{
    public class AiService : IAiService
    {
        private readonly HttpClient _httpClient;
        private readonly string _openAiApiKey;
        private readonly JsonSerializerOptions _jsonOptions;
        private readonly string _accountId;
        private readonly string _accessKey;
        private readonly string _secretKey;
        private readonly string _bucket;
        private readonly string _publicBaseUrl;
        public AiService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _openAiApiKey = configuration["OpenAi:ApiKey"] ?? "";
            _accountId = configuration["CloudflareR2:AccountId"] ?? "";
            _accessKey = configuration["CloudflareR2:AccessKeyId"] ?? "";
            _secretKey = configuration["CloudflareR2:SecretAccessKey"] ?? "";
            _bucket = configuration["CloudflareR2:BucketName"] ?? "";
            _publicBaseUrl = configuration["CloudflareR2:PublicBaseUrl"]?.TrimEnd('/') ?? "";

            _jsonOptions = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                WriteIndented = false
            };
        }

        public async Task<string> GenerateAiArticleTextAsync(string theme, int level)
        {
            try
            {
                var systemPrompt = GetSystemPromptByLevel(level);
                var userPrompt = GetUserPromptByLevel(theme, level);

                var request = new
                {
                    model = "gpt-4o-mini",
                    messages = new[]
                    {
                        new { role = "system", content = systemPrompt },
                        new { role = "user", content = userPrompt }
                    },
                    temperature = 0.7,
                    max_tokens = level == 1 ? 500 : 1000
                };

                var json = JsonSerializer.Serialize(request, _jsonOptions);
                var httpContent = new StringContent(json, Encoding.UTF8, "application/json");

                var httpRequest = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions")
                {
                    Content = httpContent
                };
                httpRequest.Headers.Add("Authorization", $"Bearer {_openAiApiKey}");

                var response = await _httpClient.SendAsync(httpRequest);

                if (!response.IsSuccessStatusCode)
                {
                    var errorContent = await response.Content.ReadAsStringAsync();
                    throw new Exception($"Failed to generate article text: {response.StatusCode} - {errorContent}");
                }

                var responseContent = await response.Content.ReadAsStringAsync();
                var openAIResponse = JsonSerializer.Deserialize<OpenAIResponse>(responseContent, _jsonOptions);

                var articleText = openAIResponse?.Choices?.FirstOrDefault()?.Message?.Content ?? "";

                if (string.IsNullOrEmpty(articleText))
                {
                    throw new Exception("No article text generated from OpenAI response");
                }

                articleText = CleanMarkdown(articleText);

                return articleText;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error generating article text: {ex.Message}");
                throw;
            }
        }

        private string GetSystemPromptByLevel(int level)
        {
            return level switch
            {
                1 => @"You are an AI specialized in simplifying technology articles for English learners.
                    You create educational content at an easy–intermediate English level (A2–B1).
                    If the user provides a full article, summarize and simplify it.
                    If the user provides only a topic, create an article from scratch.
                    Guidelines for BASIC level:
                    - Length: between 900 and 1200 characters
                    - Use simple vocabulary and short sentences
                    - Avoid jargon or complex words
                    - Explain the topic clearly, with simple examples
                    - Keep tone friendly and educational.",

                2 => @"You are an AI specialized in writing advanced technology articles for English learners and professionals.
                       You create educational content at an advanced English level (B2–C1).
                       If the user provides a full article, summarize and adapt it in a technical and fluent style.
                       If the user provides only a topic, create an article from scratch with depth and precision.
                       Guidelines for ADVANCED level:
                       - Length: between 1600 and 1900 characters
                       - Use advanced vocabulary and technical accuracy
                       - Explain context, importance, and applications
                       - Keep text cohesive, professional, and detailed.",

                _ => "You are an AI assistant that writes educational technology articles."
            };
        }

        private string GetUserPromptByLevel(string input, int level)
        {
            return level switch
            {
                1 => $@"Input: {input}
                    If this input is a full article, rewrite and summarize it for English learners at a BASIC level (A2–B1),
                    keeping 900–1200 characters. 
                    If it’s only a topic (like 'Data Structures' or 'APIs'), create a simple educational text about it from scratch.
                    Focus on clarity, simplicity, and comprehension.",

                2 => $@"Input: {input}
                    If this input is a full article, summarize and rewrite it for advanced English learners (B2–C1) with technical detail,
                    keeping 1600–1900 characters. 
                    If it’s only a topic, create a deep, structured article from scratch, exploring the principles, context,
                    and real-world applications of {input}.",

                _ => $"Write an educational article about {input}."
            };
        }

        private static string CleanMarkdown(string text)
        {
            if (string.IsNullOrWhiteSpace(text))
                return text;

            text = System.Text.RegularExpressions.Regex.Replace(text, @"(\*\*|__)(.*?)\1", "$2");
            text = System.Text.RegularExpressions.Regex.Replace(text, @"(\*|_)(.*?)\1", "$2");

            text = System.Text.RegularExpressions.Regex.Replace(text, @"```[\s\S]*?```", string.Empty);

            text = System.Text.RegularExpressions.Regex.Replace(text, @"^#{1,6}\s*", string.Empty, System.Text.RegularExpressions.RegexOptions.Multiline);
            
            text = System.Text.RegularExpressions.Regex.Replace(text, @"^\s*>\s*", string.Empty, System.Text.RegularExpressions.RegexOptions.Multiline);
            
            text = System.Text.RegularExpressions.Regex.Replace(text, @"\n{2,}", "\n\n").Trim();

            return text;
        }

        public async Task<string> GenerateAudioAsync(string text, string articleTitle, int level, string voice = "onyx")
        {
            try
            {
                var request = new
                {
                    model = "gpt-4o-mini-tts",
                    input = text,
                    voice = voice,
                    format = "mp3"
                };

                var json = JsonSerializer.Serialize(request, _jsonOptions);
                var httpContent = new StringContent(json, Encoding.UTF8, "application/json");

                var httpRequest = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/audio/speech")
                {
                    Content = httpContent
                };
                httpRequest.Headers.Add("Authorization", $"Bearer {_openAiApiKey}");

                var response = await _httpClient.SendAsync(httpRequest);
                if (!response.IsSuccessStatusCode)
                {
                    var error = await response.Content.ReadAsStringAsync();
                    throw new Exception($"Failed to generate audio: {response.StatusCode} - {error}");
                }

                await using var audioStream = await response.Content.ReadAsStreamAsync();

                var fileReplaceName = $"{ReplaceFileName(articleTitle)}_{(level == 1 ? "basic" : "advanced")}_{DateTime.UtcNow:yyyyMMdd_HHmmss}.mp3";

                var publicUrl = await UploadToCloudflareR2Async(audioStream, fileReplaceName, "audio/mpeg", "levelbyte");

                Console.WriteLine($"Audio uploaded to R2: {publicUrl}");
                return publicUrl;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error while generating or uploading audio: {ex.Message}");
                throw;
            }
        }

        public async Task<string> UploadImageAsync(Stream imageStream, string fileName, string contentType, string articleTitle)
        {
            try
            {
                var sanitizedFileName = ReplaceFileName(articleTitle);
                var timestamp = DateTime.UtcNow.ToString("dd-MM-yyyy_HH-mm-ss");
                var extension = Path.GetExtension(fileName).ToLowerInvariant();
                var fullFileName = $"{sanitizedFileName}_{timestamp}{extension}";

                var publicUrl = await UploadToCloudflareR2Async(imageStream, fullFileName, contentType, "levelbyte-img");

                Console.WriteLine($"Image uploaded to R2: {publicUrl}");
                return publicUrl;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error while uploading image: {ex.Message}");
                throw;
            }
        }

        private static string ReplaceFileName(string name)
        {
            foreach (var c in Path.GetInvalidFileNameChars())
                name = name.Replace(c, '_');
            return name.Replace(" ", "_").ToLowerInvariant();
        }

        private async Task<string> UploadToCloudflareR2Async(Stream fileStream, string fileName, string contentType, string folder)
        {
            var config = new AmazonS3Config
            {
                ServiceURL = $"https://{_accountId}.r2.cloudflarestorage.com",
                ForcePathStyle = true,
                SignatureVersion = "4",
                UseHttp = false
            };

            using var s3Client = new AmazonS3Client(_accessKey, _secretKey, config);

            await using var memoryStream = new MemoryStream();
            await fileStream.CopyToAsync(memoryStream);
            memoryStream.Position = 0;

            var fullPath = $"{folder}/{fileName}";
            var uploadRequest = new PutObjectRequest
            {
                BucketName = _bucket,
                Key = fullPath,
                InputStream = memoryStream,
                ContentType = contentType,
                DisablePayloadSigning = true
            };

            await s3Client.PutObjectAsync(uploadRequest);

            return $"{_publicBaseUrl}/{fullPath}";
        }
    }
}