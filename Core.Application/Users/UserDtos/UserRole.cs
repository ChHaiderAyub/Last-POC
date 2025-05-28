using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Application.Users.UserDtos
{
    public class UsersRole
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }  
        public string PhoneNumber { get; set; }
    }
}
