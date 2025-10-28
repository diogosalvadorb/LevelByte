using LevelByte.Application.ViewModels;
using MediatR;

namespace LevelByte.Application.Commands.UserCommands.LoginUser
{
    public class LoginUserCommand : IRequest<LoginUserViewModel>
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
