import React, { useState, createContext } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";

export const PostContext = React.createContext();

export const PostProvider = (props) => {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState([]);
  const [searchPost, setSearchPost] = useState("")
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

  const addPost = (post) => {
    return getToken().then((token) =>
        fetch(apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
    }).then(resp => {
      // debugger
      if (resp.ok) {
        return resp.json();
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

  return (
    <PostContext.Provider value={{ post, setPost, posts, getAllPosts, addPost, searchPost, setSearchPost, findPost, getPost, updatePost }}>
      {props.children}
    </PostContext.Provider>
  );
};
