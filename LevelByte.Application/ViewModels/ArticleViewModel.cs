namespace LevelByte.Application.ViewModels
{
    public class ArticleViewModel
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public List<ArticleLevelViewModel> Levels { get; set; } = new();
    }
}
