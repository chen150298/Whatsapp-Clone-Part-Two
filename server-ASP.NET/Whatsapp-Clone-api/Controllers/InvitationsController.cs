using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services;
using Domain;

namespace Whatsapp_Clone_api.Controllers
{
    [Route("api/invitations")]
    [ApiController]
    public class InvitationsController : ControllerBase
    {
        private UserService _service;

        public InvitationsController(UserService service)
        {
            _service = service;
        }

        //POST: api/invitations
        [HttpPost]
        public ActionResult Invitations([Bind("from, to, server")] Invitation invite)
        {
            if (invite.From == null || invite.To == null || invite.Server == null) { return BadRequest(); }
            if (!_service.UserExist(invite.To))
            {
                return NotFound();
            }
            Chat? chat = null;
            if (!_service.ChatExist(invite.To, invite.From)) {
                chat = new Chat() { Id = invite.From, Name = invite.From, Server = invite.Server };
                _service.AddChat(invite.To, chat);
            }
            return CreatedAtAction(nameof(Invitations), chat);
        }


    }
}
