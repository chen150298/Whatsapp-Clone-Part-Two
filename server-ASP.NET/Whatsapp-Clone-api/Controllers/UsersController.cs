using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Whatsapp_Clone_api.Controllers
{
    [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        //GET: api/Users/UserId
        [HttpGet("UserId")]
        public ActionResult<string> GetUserId()
        {
            var token = User.Claims.FirstOrDefault(x => x.Type.ToString().Equals("UserId"));
            if (token == null)
            {
                return BadRequest();
            }
            return Ok(token.Value);
        }
    }
}
