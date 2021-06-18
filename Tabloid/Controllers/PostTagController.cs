using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PostTagController : ControllerBase
    {
        // Define private properties for the PostTagController to link the relevant repositories.
        private readonly IPostTagRepository _postTagRepository;

        // Create a Constructor Method to instantiate the controller
        public PostTagController(IPostTagRepository postTagRepository)
        {
            _postTagRepository = postTagRepository;
        }


        // GET: api/<PostTagController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<PostTagController>/5
        [HttpGet("{postId}")]
        public IActionResult Get(int postId)
        {
            return Ok(_postTagRepository.GetPostTagsByPostId(postId));
        }

        // POST api/<PostTagController>
        [HttpPost]
        public IActionResult Post(PostTag postTag)
        {
            _postTagRepository.PostAddTag(postTag);
            return NoContent();
        }

        // PUT api/<PostTagController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<PostTagController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
