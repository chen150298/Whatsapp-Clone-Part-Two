using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain;

namespace Services
{
    public class UserService
    {
        private static List<User> _users;

        public UserService(List<User> users)
        {
            _users = users;
            //delete Meeeeeeee
            if (_users.Count == 0)
            {
                // user 1: Lion
                User user = new User() { Username = "Lion", Nickname = "lio", Password = "1" };
                _users.Add(user);
                // user 2: Tiger
                User user2 = new User() { Username = "Tiger", Nickname = "ty", Password = "1" };
                _users.Add(user2);
            }
        }

        /************************ User **************************/

        public void Add(User user)
        {
            _users.Add(user);
        }

        public void Delete(string username)
        {
            var user = Get(username);
            if (user == null) { return; }
            _users.Remove(user);
        }

        //someone else is changing the details
        public void Edit(User user)
        {
            var u = Get(user.Username);
            if (u == null) { return; }
            u.Nickname = user.Nickname;
        }

        public User? Get(string? username)
        {
            if (username == null)
            {
                return null;
            }
            var user = _users.FirstOrDefault(u => u.Username == username);
            if (user == null) { return null; }
            return user;
        }

        public List<User> GetAll()
        {
            return _users;
        }

        public bool UserEntrace(string username, string password)
        {
            return _users.FirstOrDefault(u => u.Username == username && u.Password == password) != null;
        }

        public bool UserExist(string username)
        {
            return _users.FirstOrDefault(u => u.Username == username) != null;
        }

        /************************ Chats **************************/

        public void AddChat(string username, Chat chat)
        {
            var user = Get(username);
            if (user == null) { return; }
            if (!user.Chats.ContainsKey(chat))
            {
                user.Chats.Add(chat, new List<Message>());
            }

        }

        public List<Chat>? GetChats(string username)
        {
            User? user = Get(username);
            if (user == null) { return null; }
            return user.Chats.Keys.OrderByDescending(c => c.LastDate).ToList();
        }

        public Chat? GetChat(string username, string id)
        {

            var chats = GetChats(username);
            if (chats == null) { return null; }
            Chat? chat = chats.Where(c => c.Id == id).FirstOrDefault();
            if (chat == null) { return null; }
            return chat;

        }

        public bool ChatExist(string username, string id)
        {
            return GetChat(username, id) != null;
        }

        public void DeleteChat(string username, string id)
        {
            User? user = Get(username);
            if (user == null) { return; }
            var chat = GetChat(username, id);
            if (chat == null) { return; }
            user.Chats.Remove(chat);
        }

        /************************ Message **************************/

        public List<Message>? GetMessages(string username, string id)
        {
            User? user = Get(username);
            if (user == null) { return null; }
            var chat = GetChat(username, id);
            if (chat == null) { return null; }
            return user.Chats[chat];
        }

        public void AddMessage(string username, string id, Message message)
        {
            var user = Get(username);
            if (user == null) { return; }
            var chat = GetChat(username, id);
            if (chat == null) { return; }
            int nextId = user.Chats.Values.Max(c => { if (c.Count > 0) { return c.Max(m => m.Id) + 1; } else { return 0;} });
            message.Id = nextId;
            message.Created = DateTime.Now.ToString();
            user.Chats[chat].Add(message);
            chat.Last = message.Content;
            chat.LastDate = message.Created;

        }

        public Message? GetMessageById(string username, string idChat,int idMessage)
        {
            var user = Get(username);
            if (user == null) { return null; }
            var chat = GetChat(username,idChat);
            if (chat == null) { return null; }
            var message= user.Chats[chat].FirstOrDefault(m=> m.Id==idMessage);
            if(message== null) { return null; }
            return message;

        }

        public void DeleteMessage(string username, string idChat,int idMessage)
        {
            User? user = Get(username);
            if (user == null) { return; }
            var chat = GetChat(username, idChat);
            if (chat == null) { return; }
            var message = GetMessageById(username, idChat, idMessage);
            if (message == null) { return; }
            user.Chats[chat].Remove(message);
            
        }


    }
}

