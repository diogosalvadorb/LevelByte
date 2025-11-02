using LevelByte.Application.Validators;
using LevelByte.Application.ViewModels;
using LevelByte.Core.Entities;
using LevelByte.Core.Repository;
using LevelByte.Core.Services;
using MediatR;

namespace LevelByte.Application.Commands.ArticleCommands.CreateArticle
{
    public class CreateArticleCommandHandler : IRequestHandler<CreateArticleCommand, ArticleViewModel>
    {
        private readonly IArticleRepository _repository;
        private readonly IAiService _aiService;

        public CreateArticleCommandHandler(IArticleRepository repository, IAiService aiService)
        {
            _repository = repository;
            _aiService = aiService;
        }

        public async Task<ArticleViewModel> Handle(CreateArticleCommand request, CancellationToken cancellationToken)
        {
            string? imageUrl = null;

            if(request.Image != null)
            {
                var validation = ImageValidator.ValidateImage(request.Image);
                if (!validation.IsValid)
                {
                    throw new InvalidOperationException(validation.ErrorMessage);
                }

                var imageResult = await ImageValidator.ProcessImage(request.Image);

                using var imageStream = new MemoryStream(imageResult.Data);
                imageUrl = await _aiService.UploadImageAsync(imageStream, request.Image.FileName, imageResult.ContentType, request.Title);
            }

            var article = new Article(request.Title, imageUrl);

            var basicText = await _aiService.GenerateAiArticleTextAsync(request.Theme, 1);
            //var basicText = GenerateOpenAIBasicText(request.Theme);
            var basicAudio = request.GenerateAudio ? await _aiService.GenerateAudioAsync(basicText, request.Title, 1) : string.Empty;
            //var basicAudio = string.Empty;

            var basicWordCount = CountWords(basicText);

            var basicLevel = new ArticleLevel(
                article.Id,
                1,
                basicText,
                basicAudio,
                basicWordCount
            );

            var advancedText = await _aiService.GenerateAiArticleTextAsync(request.Theme, 2);
            //var advancedText = GenerateOpenAIBasicText(request.Theme);
            var advancedAudio = request.GenerateAudio ? await _aiService.GenerateAudioAsync(advancedText, article.Title, 2) : string.Empty;
            //var advancedAudio = string.Empty;

            var advancedWordCount = CountWords(advancedText);

            var advancedLevel = new ArticleLevel(
                article.Id,
                2,
                advancedText,
                advancedAudio,
                advancedWordCount
            );

            article.AddLevel(basicLevel);
            article.AddLevel(advancedLevel);

            var created = await _repository.CreateArticleAsync(article);

            return new ArticleViewModel
            {
                Id = article.Id,
                Title = article.Title,
                ImageUrl = article.ImageUrl,
                CreatedAt = article.CreatedAt,
                Levels = article.Levels.Select(l => new ArticleLevelViewModel
                {
                    Id = l.Id,
                    Level = l.Level,
                    Text = l.Text,
                    AudioUrl = l.AudioUrl,
                    WordCount = l.WordCount
                }).ToList()
            };
        }

        private int CountWords(string text)
        {
            if (string.IsNullOrWhiteSpace(text))
                return 0;

            return text.Split(new[] { ' ', '\t', '\n', '\r' }, StringSplitOptions.RemoveEmptyEntries).Length;
        }

        private string GenerateOpenAIBasicText(string theme)
        {
            return $"This is a basic level article about {theme}. " +
                   $"It uses simple words and short sentences. " +
                   $"The vocabulary is easy to understand. " +
                   $"This level is perfect for beginners learning English.";
        }

        private string GenerateOpenAIAdvancedText(string theme)
        {
            return $"This comprehensive article delves into the intricacies of {theme}. " +
                   $"It employs sophisticated vocabulary and complex sentence structures. " +
                   $"The content explores nuanced perspectives and demonstrates advanced linguistic patterns. " +
                   $"This level challenges proficient English speakers to expand their understanding.";
        }
    }
}