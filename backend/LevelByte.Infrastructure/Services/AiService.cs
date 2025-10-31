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
        private readonly IConfiguration _configuration;
        public AiService(HttpClient httpClient, IConfiguration configuration)
        {
            _configuration = configuration;
            _httpClient = httpClient;
            _openAiApiKey = configuration["OpenAi:ApiKey"] ?? "";

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
                    //trocar para gpt 5 e comparar qualidade do texto gerado
                    model = "gpt-4o-mini",
                    messages = new[]
                    {
                        new { role = "system", content = systemPrompt },
                        new { role = "user", content = userPrompt }
                    },
                    temperature = 0.7,

                    //testar com valores diferentes de tokens
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

        public async Task<string> GenerateAudioAsync(string text, string voice = "onyx")
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

                var accountId = _configuration["CloudflareR2:AccountId"];
                var accessKey = _configuration["CloudflareR2:AccessKeyId"];
                var secretKey = _configuration["CloudflareR2:SecretAccessKey"];
                var bucket = _configuration["CloudflareR2:BucketName"];

                var config = new AmazonS3Config
                {
                    ServiceURL = $"https://{accountId}.r2.cloudflarestorage.com",
                    ForcePathStyle = true,
                    SignatureVersion = "4",
                    UseHttp = false
                };


                var s3Client = new AmazonS3Client(accessKey, secretKey, config);

                await using var memoryStream = new MemoryStream();
                await audioStream.CopyToAsync(memoryStream);
                memoryStream.Position = 0;

                var fileName = $"levelbyte/audio_{DateTime.UtcNow:yyyyMMdd_HHmmss}.mp3";
                var uploadRequest = new PutObjectRequest
                {
                    BucketName = bucket,
                    Key = fileName,
                    InputStream = memoryStream,
                    ContentType = "audio/mpeg",
                    DisablePayloadSigning = true
                };

                var uploadResponse = await s3Client.PutObjectAsync(uploadRequest);

                string publicUrl = $"{_configuration["CloudflareR2:PublicBaseUrl"].TrimEnd('/')}/{fileName}";

                Console.WriteLine($"Audio uploaded to R2: {publicUrl}");
                return publicUrl;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error while generating or uploading audio: {ex.Message}");
                throw;
            }
        }
    }
}