namespace LevelByte.Core.Entities
{
    public class User
    {
        private User()
        {
        }

        public User(string fullName, string email, string passwordHash, string role, Guid? id = null)
        {
            Id = id ?? Guid.NewGuid();
            FullName = ValidateRequired(fullName, nameof(fullName));
            Email = ValidateEmail(email);
            PasswordHash = ValidateRequired(passwordHash, nameof(passwordHash));
            Role = ValidateRequired(role, nameof(role));
        }

        public Guid Id { get; private set; }
        public string FullName { get; private set; } = string.Empty;
        public string Email { get; private set; } = string.Empty;
        public string PasswordHash { get; private set; } = string.Empty;
        public string Role { get; private set; } = string.Empty;

        private static string ValidateEmail(string email)
        {
            var value = ValidateRequired(email, nameof(email));

            if (!value.Contains('@'))
                throw new ArgumentException("User email is invalid.", nameof(email));

            return value;
        }

        private static string ValidateRequired(string value, string parameterName)
        {
            if (string.IsNullOrWhiteSpace(value))
                throw new ArgumentException($"{parameterName} is required.", parameterName);

            return value.Trim();
        }
    }
}
