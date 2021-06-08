using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Utils;
using Tabloid.Models;
using Microsoft.Extensions.Configuration;

namespace Tabloid.Repositories
{
    public class PostRepository : BaseRepository, IPostRepository
    {
        public PostRepository(IConfiguration configuration) : base(configuration) { }
        public Post GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT p.Id AS PostId, p.Title, p.Content, 
                       p.ImageLocation AS PostImageLocation,  p.CreateDateTime AS PostDateCreated, p.PublishDateTime, p.IsApproved, p.CategoryId, p.UserProfileId,
                       up.FirstName, up.LastName, up.Email, up.DisplayName, 
                       up.ImageLocation AS UserProfileImageUrl
                FROM Post p 
                       LEFT JOIN UserProfile up ON p.UserProfileId = up.id
                    WHERE p.Id = @Id
                    ORDER BY PostDateCreated";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Post post = null;
                    while (reader.Read())
                    {
                        post = new Post()
                        {
                            Id = DbUtils.GetInt(reader, "PostId"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Content = DbUtils.GetString(reader, "Content"),
                            ImageLocation = DbUtils.GetString(reader, "PostImageLocation"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "PostDateCreated"),
                            PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime"),
                            IsApproved = reader.GetBoolean(reader.GetOrdinal("IsApproved")),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserProfileId"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName")
                            },
                        };
                    }

                    reader.Close();

                    return post;
                }
            }
        }
    }
}
