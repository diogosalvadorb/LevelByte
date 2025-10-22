using LevelByte.Application.ViewModels;
using MediatR;

namespace LevelByte.Application.Commands.ArticleCommands.CreateArticle
{
    public class CreateArticleCommand : IRequest<ArticleViewModel>
    {
        public CreateArticleCommand(string title, string theme)
        {
            Title = title;
            Theme = theme;
        }

        public string Title { get; set; } = string.Empty;
        public string Theme { get; set; } = string.Empty;
    }
}
