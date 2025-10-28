using LevelByte.Application.ViewModels;
using MediatR;

namespace LevelByte.Application.Commands.UserCommands.CreateUser
{
    public class CreateUserCommand : IRequest<CreateUserViewModel>
    {

        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PassWordHash { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
    }
}
