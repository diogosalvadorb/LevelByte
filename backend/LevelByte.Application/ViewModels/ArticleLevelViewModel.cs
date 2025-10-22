namespace LevelByte.Application.ViewModels
{
    public class ArticleLevelViewModel
    {
        public Guid Id { get; set; }
        public int Level { get; set; }
        public string Text { get; set; } = string.Empty;
        public string AudioUrl { get; set; } = string.Empty;
        public int WordCount { get; set; }
    }
}
