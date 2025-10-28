namespace LevelByte.Application.ViewModels
{
    public class LoginUserViewModel
    {
        public LoginUserViewModel(string name, string role, string email, string token)
        {
            Name = name;
            Role = role;
            Email = email;
            Token = token;
        }

        public string Name { get; set; }
        public string Role { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
    }
}
