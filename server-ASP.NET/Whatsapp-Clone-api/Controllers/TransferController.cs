using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services;
using Domain;

namespace Whatsapp_Clone_api.Controllers
{
    [Route("api/transfer")]
    [ApiController]
    public class TransferController : ControllerBase
    {

        private UserService _service;

        public TransferController(UserService service)
        {
            _service = service;
        }

        //POST: api/transfer
        [HttpPost]
        public ActionResult Transfer([Bind("from, to, content")] Transfer transfer )
        {
            if(transfer.From == null || transfer.To == null || transfer.Content == null) { return BadRequest(); }
            if (!_service.UserExist(transfer.To))
            {
                return NotFound();
            }           
            if (_service.ChatExist(transfer.To, transfer.From))
            {
                Message message = new Message() { Content = transfer.Content, Created = DateTime.Now.ToString(), Sent = false };
                _service.AddMessage(transfer.To, transfer.From, message);
                return CreatedAtAction(nameof(Transfer), message);
            }
            return BadRequest();
        }
    }
}
