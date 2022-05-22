using Microsoft.AspNetCore.SignalR;

namespace Whatsapp_Clone_api.Hubs
{
    public class ChatHub: Hub
    {
        public async Task UpdateMessages(string from, string to, string content)
        {
            await Clients.All.SendAsync("LoadMessages", content);
        }

        public async Task UpdateChats()
        {
            await Clients.All.SendAsync("LoadChats");
        }
    }
}
