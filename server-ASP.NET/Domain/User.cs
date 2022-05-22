using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class User
    {
        [Required]
        [Key]
        [RegularExpression("^[A-Za-z]{3,16}", ErrorMessage = "Username should be 3 - 16 characters and should only include letters!")]
        public string Username { get; set; }

        [Required]
        [RegularExpression("^.{3,}", ErrorMessage = "Nickname should be at least 3 characters!")]
        public string Nickname { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [RegularExpression("^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$", ErrorMessage = "Password should be 8-20 characters and should include at least 1 letter, 1 number and 1 special character!")]
        public string Password { get; set; }

        //[Required]
        //public string Image { get; set; }

        //public List<Chat> ActiveChats { get; set; } = new List<Chat>();

        //public List<Message> AllMassages { get; set; } = new List<Message>();

        public Dictionary<Chat, List<Message>> Chats=new Dictionary<Chat, List<Message>>();
    }
}
