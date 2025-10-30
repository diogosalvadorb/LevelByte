using LevelByte.Application.Validators;
using LevelByte.Application.ViewModels;
using LevelByte.Core.Repository;
using MediatR;

namespace LevelByte.Application.Commands.ArticleCommands.UpdateArticle
{
    public class UpdateArticleCommandHandler : IRequestHandler<UpdateArticleCommand, ArticleViewModel?>
    {
        private readonly IArticleRepository _repository;

        public UpdateArticleCommandHandler(IArticleRepository repository)
        {
            _repository = repository;
        }

        public async Task<ArticleViewModel?> Handle(UpdateArticleCommand request, CancellationToken cancellationToken)
        {
            var article = await _repository.GetArticleByIdAsync(request.Id);
            if (article == null)
                return null;

            byte[]? imageData = article.ImageData;
            string? imageContentType = article.ImageContentType;

            if (request.RemoveImage)
            {
                imageData = null;
                imageContentType = null;
            }

            else if (request.Image != null)
            {
                var validation = ImageValidator.ValidateImage(request.Image);
                if (!validation.IsValid)
                    throw new InvalidOperationException(validation.ErrorMessage);

                var imageResult = await ImageValidator.ProcessImage(request.Image);
                imageData = imageResult.Data;
                imageContentType = imageResult.ContentType;
            }

            article.UpdateTitle(request.Title);
            article.UpdateImage(imageData, imageContentType);

            await _repository.UpdateArticleAsync(article);

            return new ArticleViewModel
            {
                Id = article.Id,
                Title = article.Title,
                HasImage = article.ImageData != null,
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
