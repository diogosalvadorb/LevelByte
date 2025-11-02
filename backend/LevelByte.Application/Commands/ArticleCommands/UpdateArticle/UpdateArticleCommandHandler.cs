using LevelByte.Application.Validators;
using LevelByte.Application.ViewModels;
using LevelByte.Core.Repository;
using LevelByte.Core.Services;
using MediatR;

namespace LevelByte.Application.Commands.ArticleCommands.UpdateArticle
{
    public class UpdateArticleCommandHandler : IRequestHandler<UpdateArticleCommand, ArticleViewModel?>
    {
        private readonly IArticleRepository _repository;
        private readonly IAiService _aiService;

        public UpdateArticleCommandHandler(IArticleRepository repository, IAiService aiService)
        {
            _repository = repository;
            _aiService = aiService;
        }

        public async Task<ArticleViewModel?> Handle(UpdateArticleCommand request, CancellationToken cancellationToken)
        {
            var article = await _repository.GetArticleByIdAsync(request.Id);
            if (article == null)
                return null;

            string? imageUrl = article.ImageUrl;

            if (request.RemoveImage)
            {
                imageUrl = null;
            }
            else if (request.Image != null)
            {
                var validation = ImageValidator.ValidateImage(request.Image);
                if (!validation.IsValid)
                    throw new InvalidOperationException(validation.ErrorMessage);

                var imageResult = await ImageValidator.ProcessImage(request.Image);

                using var imageStream = new MemoryStream(imageResult.Data);
                imageUrl = await _aiService.UploadImageAsync(imageStream, request.Image.FileName, imageResult.ContentType, request.Title);
            }

            article.UpdateTitle(request.Title);
            article.UpdateImage(imageUrl);

            await _repository.UpdateArticleAsync(article);

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
    }
}