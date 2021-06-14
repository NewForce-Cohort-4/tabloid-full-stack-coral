import * as firebase from "firebase/app";
import React, { useState, createContext, useEffect } from "react";
import "firebase/auth";

export const PostContext = React.createContext();

export const PostProvider = (props) => {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState([]);
  const [searchPost, setSearchPost] = useState("")
  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));
  const getToken = () => firebase.auth().currentUser.getIdToken();

  const apiUrl = "https://localhost:5001/api/post";

  const getAllPosts = () => {
    return getToken().then((token) => 
      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
    }).then((res) => res.json()))
    .then(setPosts);
  };

  const addPost = (postToAdd) => {
    return getToken().then((token) =>
        fetch(apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postToAdd)
    }).then(resp => {
      // debugger
      if (resp.ok) {
         return resp.json()
      }
      throw new Error("Unauthorized");
    }));
  };

  const updatePost = post => {
    return getToken().then((token) =>
    fetch (`apiUrl/${post.id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    }))
        .then(getAllPosts)
        
}

  const findPost = (q) => {
    return fetch(`${apiUrl}/search?q=${q}&sortDesc=true`)
    .then((res) => res.json())
    .then(setPosts)
  }

  const getPost = (id) => {
      return getToken().then((token) => 
      fetch(`${apiUrl}/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => res.json()))
  }

  const deletePost = (id) => {
    return getToken().then((token) => 
      fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }))
  };


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
    <PostContext.Provider value={{ posts, getAllPosts, addPost, searchPost, setSearchPost, findPost, getPost, getCurrentUserPosts, deletePost, updatePost }}>
      {props.children}
    </PostContext.Provider>
  );
};
