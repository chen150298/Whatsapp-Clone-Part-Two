using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace Whatsapp_Clone_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private UserService _service;

        public RegisterController(UserService service)
        {
            _service = service;
        }


        [HttpPost]
        public ActionResult<User> Register([Bind("Username,Nickname,Password")] User user)
        {
            if (user == null) { return BadRequest(); }
            if (_service.UserExist(user.Username)) { return BadRequest(); }
            if (ModelState.IsValid)
            {
                _service.Add(user);
            }
            return CreatedAtAction(nameof(Register),user);
        }
    }
}
