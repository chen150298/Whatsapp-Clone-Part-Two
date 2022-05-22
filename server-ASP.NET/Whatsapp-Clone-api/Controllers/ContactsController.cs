using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Services;

namespace Whatsapp_Clone_api.Controllers
{
    [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/contacts")]
    [ApiController]
    public class ContactsController : ControllerBase
    {

        private UserService _service;

        public ContactsController(UserService service)
        {
            _service = service;
        }

        private string? GetUserId()
        {
            var token = User.Claims.FirstOrDefault(x => x.Type.ToString().Equals("UserId"));
            if (token == null)
            {
                return null;
            }
            return token.Value;
        }

        // GET: api/contacts
        [HttpGet]
        public ActionResult<List<Chat>> GetContacts()
        {
            var username = GetUserId();
            if (username == null) { return BadRequest(); }
            var chats = _service.GetChats(username);
            if (chats == null) { return BadRequest(); }
            return Ok(chats);

        }

        // POST: api/contacts
        [HttpPost]
        public ActionResult AddChat([Bind("Id,Name,Server")] Chat chat)
        {
            var userId = GetUserId();
            if (userId == null) { return BadRequest(); }
            if (ModelState.IsValid)
            {
                if (_service.ChatExist(userId, chat.Id)) { return Conflict(); }
                _service.AddChat(userId, chat);
                return CreatedAtAction(nameof(AddChat), chat);

            }
            return BadRequest();

        }

        // GET: api/contacts/id
        [HttpGet("{id}")]
        public ActionResult<Chat> GetChat(string id)
        {
            var username = GetUserId();
            if (username == null) { return BadRequest(); }
            var chat = _service.GetChat(username,id);
            if (chat == null) { return NotFound(); }
            return Ok(chat);
        }

        // PUT: api/contacts/id
        [HttpPut("{id}")]
        public ActionResult UpdateChat(string id,Chat chat)
        {
            var userId = GetUserId();
            if (userId == null) { return BadRequest(); }
            var current_chat = _service.GetChat(userId,id);
            if(current_chat == null) { return NotFound(); }
            current_chat.Name = chat.Name;
            current_chat.Server = chat.Server;
            return NoContent();
        }

        // DELETE: api/contacts/id
        [HttpDelete("{id}")]
        public ActionResult DeleteChat(string id)
        {
            var userId = GetUserId();
            if (userId == null) { return BadRequest(); }
            var current_chat = _service.GetChat(userId, id);
            if (current_chat == null) { return NotFound(); }
            _service.DeleteChat(userId,id);
            return NoContent();
        }

        //GET: api/contacts/id/messages
        [HttpGet("{id}/messages")]
        public ActionResult<List<Message>> GetMessages(string id)
        {
            var userId = GetUserId();
            if (userId == null) { return BadRequest(); }
            List<Message>? messages = _service.GetMessages(userId,id);
            if (messages!=null)
            {
                return Ok(messages);
            }
            return NotFound();
        }

        //POST: api/contacts/id/messages
        [HttpPost("{id}/messages")]
        public ActionResult AddMessage(string id, [Bind("Id,Content,Created,Sent")] Message message)
        {
            var userId = GetUserId();
            if (userId == null) { return BadRequest(); }
            if (ModelState.IsValid)
            {
               
                if (_service.ChatExist(userId, id))
                {
                    _service.AddMessage(userId, id, message);
                    return CreatedAtAction(nameof(AddMessage), message);
                }

            }
            return BadRequest();
        }

        //GET: api/contacts/id/messages/id2
        [HttpGet("{idChat}/messages/{idMessage}")]
        public ActionResult<Message> GetMessageById(string idChat, int idMessage)
        {
            var userId = GetUserId();
            if (userId == null) { return BadRequest(); }
            var message = _service.GetMessageById(userId, idChat, idMessage);
            if (message != null)
            {
                return Ok(message);
            }
            return NotFound();
        }

        //PUT: api/contacts/id/messages/id2
        [HttpPut("{idChat}/messages/{idMessage}")] 
        public ActionResult EditMessage(string idChat, int idMessage,Message message)
        {
            var userId = GetUserId();
            if (userId == null) { return BadRequest(); }
            var current_message = _service.GetMessageById(userId, idChat, idMessage);
         
            if (current_message == null) { return NotFound(); }
            current_message.Content = message.Content;
            return NoContent();
        }

        //DELETE: api/contacts/id/messages/id2
        [HttpDelete("{idChat}/messages/{idMessage}")]
        public ActionResult DeleteMessage(string idChat, int idMessage)
        {
            var userId = GetUserId();
            if (userId == null) { return BadRequest(); }
            var message = _service.GetMessageById(userId, idChat, idMessage);
            if (message == null) { return NotFound(); }
            _service.DeleteMessage(userId, idChat, idMessage);
            return NoContent();
        }



    }
}
