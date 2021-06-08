import React, { useState, createContext } from "react";

export const PostContext = React.createContext();

export const PostProvider = (props) => {
  const [posts, setPosts] = useState([]);
  const [searchPost, setSearchPost] = useState("")

  const getAllPosts = () => {
    return fetch("/api/post/getwithcomments")
      .then((res) => res.json())
      .then(setPosts);
  };

  const addPost = (post) => {
    return fetch("/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
  };

  const findPost = (q) => {
    return fetch(`api/post/search?q=${q}&sortDesc=true`)
    .then((res) => res.json())
    .then(setPosts)
  }

  const getPost = (id) => {
      return fetch(`/api/post/${id}`)
      .then((res) => res.json())
  }

  return (
    <PostContext.Provider value={{ posts, getAllPosts, addPost, searchPost, setSearchPost, findPost, getPost }}>
      {props.children}
    </PostContext.Provider>
  );
};
