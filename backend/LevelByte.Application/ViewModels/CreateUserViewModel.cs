namespace LevelByte.Application.ViewModels
{
    public class CreateUserViewModel
    {
        public CreateUserViewModel(string email)
        {
            Email = email;
        }

        public string Email { get; set; }
    }
}
