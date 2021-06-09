import React, { useState, createContext, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";

export const PostContext = React.createContext();

export const PostProvider = (props) => {
  const [posts, setPosts] = useState([]);
  const [searchPost, setSearchPost] = useState("")
  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));
  const getToken = () => firebase.auth().currentUser.getIdToken();
  
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

  const getCurrentUserPosts = () => {
     return getToken().then((token) =>
       fetch(`/api/post/getbyuser/${userProfile.id}`, {
         method: "GET",
         headers: {
           Authorization: `Bearer ${token}`,
         },
       }).then((resp) => resp.json())
       .then(setPosts)
     );
  }

  return (
    <PostContext.Provider value={{ posts, getAllPosts, addPost, searchPost, setSearchPost, findPost, getPost, getCurrentUserPosts }}>
      {props.children}
    </PostContext.Provider>
  );
};
