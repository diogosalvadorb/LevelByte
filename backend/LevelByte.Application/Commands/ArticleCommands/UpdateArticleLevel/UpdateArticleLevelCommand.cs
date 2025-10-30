using LevelByte.Application.ViewModels;
using MediatR;

namespace LevelByte.Application.Commands.ArticleCommands.UpdateArticleLevel
{
    public class UpdateArticleLevelCommand : IRequest<ArticleLevelViewModel?>
    {
        public Guid ArticleId { get; set; }
        public Guid LevelId { get; set; }
        public string Text { get; set; } = string.Empty;
        public string AudioUrl { get; set; } = string.Empty;
    }
}