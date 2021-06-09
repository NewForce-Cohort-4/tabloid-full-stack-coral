import React, { useContext, useEffect } from "react";
import { PostContext } from "../providers/PostProvider";
import Post from "./Post";

export const UserPosts = () => {
  const { posts, getCurrentUserPosts } = useContext(PostContext);

  useEffect(() => {
    getCurrentUserPosts();
  }, []);
  
  
  
  return (
    <>
      {posts.length > 0 ?
        <div className="container">
          <div className="row justify-content-center">
            <div className="cards-column">
              {posts.map((post) => (
                <Post key={post.id} post={post} />
              ))}
            </div>
          </div>
        </div>
        : <p>No posts yet..</p>
      }
    </>
  )
}