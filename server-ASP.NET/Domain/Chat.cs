using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Chat
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Server { get; set; }

        public string? Last { get; set; }=null;

        public string? LastDate { get; set; } = null;
    }
}
