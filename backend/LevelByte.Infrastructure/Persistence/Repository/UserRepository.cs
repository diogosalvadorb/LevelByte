using LevelByte.Core.Entities;
using LevelByte.Core.Repository;
using Microsoft.EntityFrameworkCore;

namespace LevelByte.Infrastructure.Persistence.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly LevelByteDbContext _context;
        public UserRepository(LevelByteDbContext context)
        {
            _context = context;
        }

        public async Task<User?> GetUserByIdAsync(Guid id)
        {
            return await _context.Users.SingleOrDefaultAsync(u => u.Id == id);
        }

        public async Task<User?> GetUserByEmailAndPasswordAsync(string email, string password)
        {
            return await _context.Users.SingleOrDefaultAsync(u => u.Email == email && u.PasswordHash == password);
        }

        public async Task CreateUserAsync(User entity)
        {
            await _context.Users.AddAsync(entity);
            await _context.SaveChangesAsync();
        }
    }
}
