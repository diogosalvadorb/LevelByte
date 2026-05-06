using LevelByte.Application.Mappings;
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

            if (request.Image != null)
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

            var basicTextTask = _aiService.GenerateAiArticleTextAsync(request.Theme, ArticleGenerationRules.BasicLevel);
            var advancedTextTask = _aiService.GenerateAiArticleTextAsync(request.Theme, ArticleGenerationRules.AdvancedLevel);

            var texts = await Task.WhenAll(basicTextTask, advancedTextTask);
            var basicText = texts[0];
            var advancedText = texts[1];

            string basicAudio = string.Empty;
            string advancedAudio = string.Empty;

            if (request.GenerateAudio)
            {
                var basicAudioTask = _aiService.GenerateAudioAsync(basicText, request.Title, ArticleGenerationRules.BasicLevel);
                var advancedAudioTask = _aiService.GenerateAudioAsync(advancedText, request.Title, ArticleGenerationRules.AdvancedLevel);

                var audios = await Task.WhenAll(basicAudioTask, advancedAudioTask);
                basicAudio = audios[0];
                advancedAudio = audios[1];
            }

            var article = Article.CreateWithGeneratedLevels(
                request.Title,
                imageUrl,
                basicText,
                advancedText,
                basicAudio,
                advancedAudio);

            await _repository.CreateArticleAsync(article);

            return article.ToViewModel();
        }
    }
}
