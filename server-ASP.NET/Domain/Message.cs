using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    // public enum Type { text, audio, image, video }

    public class Message
    {
        public int Id { get; set; }

        public string Content { get; set; }

        [DataType(DataType.DateTime)]
        public string Created { get; set; }

        public bool Sent { get; set; }
    }
}
