using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tabloid.Models
{
    public class PostTag
    {
        public int id { get; set; }
        public int PostId { get; set; }
        public List<Tag> Tags { get; set; }
    }
}
