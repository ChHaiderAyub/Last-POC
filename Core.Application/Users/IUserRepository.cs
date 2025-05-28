using Core.Application.Users.UserDtos;
using Core.Data.Entities;
using static Core.Data.Enums.Enums;

namespace Core.Application.Users
{
    public interface IUserRepository
    {
        PayloadCustom<User> RegisterUser(User user);
        PayloadCustom<User> LogIn(LoginDto loginRequest);
      PayloadCustom<List<AllUsers>> GetAllUsers();
        PayloadCustom<User>UserDetails(Guid id);
        PayloadCustom<User> DeleteUser(Guid id);
        PayloadCustom<List<UsersRole>> GetUsersByRole(string role);



    }
}
