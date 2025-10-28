using LevelByte.Application.ViewModels;
using LevelByte.Core.Entities;
using LevelByte.Core.Repository;
using LevelByte.Core.Services;
using MediatR;

namespace LevelByte.Application.Commands.UserCommands.CreateUser
{
    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, CreateUserViewModel>
    {
        private readonly IUserRepository _userRepository;
        private readonly IAuthService _authService;
        public CreateUserCommandHandler(IUserRepository userRepository, IAuthService authService)
        {
            _userRepository = userRepository;
            _authService = authService;
        }

        public async Task<CreateUserViewModel> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var passWordHash = _authService.ComputerSha256Hash(request.PassWordHash);
                var user = new User(request.FullName, request.Email, passWordHash, request.RoleCommand);

                await _userRepository.CreateUserAsync(user);

                return new CreateUserViewModel(user.Email);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while creating the user.", ex);
            }
        }
    }
}
