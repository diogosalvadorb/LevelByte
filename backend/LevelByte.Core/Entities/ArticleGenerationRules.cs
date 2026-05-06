namespace LevelByte.Core.Entities
{
    public static class ArticleGenerationRules
    {
        public const int BasicLevel = 1;
        public const int AdvancedLevel = 2;

        public static bool IsSupportedLevel(int level)
        {
            return level is BasicLevel or AdvancedLevel;
        }

        public static int GetMaxTokens(int level)
        {
            return level switch
            {
                BasicLevel => 350,
                AdvancedLevel => 500,
                _ => throw new ArgumentOutOfRangeException(nameof(level), "Unsupported article level.")
            };
        }

        public static string GetAudioLevelName(int level)
        {
            return level switch
            {
                BasicLevel => "basic",
                AdvancedLevel => "advanced",
                _ => throw new ArgumentOutOfRangeException(nameof(level), "Unsupported article level.")
            };
        }

        public static string GetSystemPrompt(int level)
        {
            return level switch
            {
                BasicLevel => @"You are an AI specialized in simplifying technology articles and news for English learners.
                     Your writing level must match A2-B1 English.
                     If the user provides an article or news text, summarize and simplify it.
                     If the user provides only a topic or headline, create an article from scratch.
                     BASIC LEVEL RULES:
                    - Length: 600-800 characters
                    - Use very short and clear sentences
                    - Avoid technical terms or explain them simply
                    - Always include one simple example
                    - Tone must be light, friendly, and educational.",

                AdvancedLevel => @"You are an AI specialized in writing advanced technology articles and news summaries for English learners.
                    Your writing level must match B2-C1 English.
                    If the user provides an article or news text, summarize and rewrite it in a more technical and fluent style.
                    If the user provides only a topic or headline, create a structured article from scratch.
                    ADVANCED LEVEL RULES:
                    - Length: 800-1100 characters
                    - Use advanced vocabulary with technical precision
                    - Provide context, relevance, and real-world applications
                    - Maintain a cohesive, professional tone.",

                _ => throw new ArgumentOutOfRangeException(nameof(level), "Unsupported article level.")
            };
        }

        public static string GetUserPrompt(string input, int level)
        {
            return level switch
            {
                BasicLevel => $@"Input: {input}
                    If this input is a full article or news text, rewrite and simplify it for English learners (A2-B1),
                    keeping 600-800 characters.
                    If it is only a topic or headline, create a simple educational text about it with one example.",

                AdvancedLevel => $@"Input: {input}
                    If this input is a full article or news text, summarize and rewrite it for advanced English learners (B2-C1),
                    keeping 800-1100 characters.
                    If it is only a topic or headline, create a deeper article explaining principles, context, relevance,
                    and applications related to {input}.",

                _ => throw new ArgumentOutOfRangeException(nameof(level), "Unsupported article level.")
            };
        }

        public static int CountWords(string text)
        {
            if (string.IsNullOrWhiteSpace(text))
                return 0;

            return text.Split(new[] { ' ', '\t', '\n', '\r' }, StringSplitOptions.RemoveEmptyEntries).Length;
        }
    }
}
