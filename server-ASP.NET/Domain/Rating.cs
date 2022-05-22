using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Rating
    {
        public int Id { get; set; }

        [MaxLength(15)]
        public string Username { get; set; }

        [Range(1, 5)]
        public int Rate { get; set; }

        public string Content { get; set; }

        [DataType(DataType.DateTime)]
        public string Date { get; set; }
    }
}
