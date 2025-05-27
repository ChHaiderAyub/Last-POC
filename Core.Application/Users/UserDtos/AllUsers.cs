using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Core.Data.Enums.Enums;

namespace Core.Application.Users.UserDtos
{
    public class AllUsers
    {
        public string Name { get; set; }
        public UserRole Role { get; set; }
    }
}
