import React, { useState, createContext, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";

export const PostTagContext = React.createContext();

export const PostTagProvider = (props) => {
  const getToken = () => firebase.auth().currentUser.getIdToken();
  const [postTags, setPostTags] = useState([]);
  const apiUrl = "https://localhost:5001/api/tag";

 const getAllPostTags = () => {
   return getToken()
     .then((token) =>
       fetch(apiUrl, {
         method: "GET",
         headers: {
           Authorization: `Bearer ${token}`,
         },
       }).then((res) => res.json())
     )
     .then(setPostTags);
 };
  const deletePostTag = (id) => {
    debugger
    return getToken().then((token) =>
      fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  };

    const addPostTag = (tag) => {
      debugger
      return getToken().then((token) =>
        fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(tag),
        })
      );
    };

  return (
    <PostTagContext.Provider
      value={{
        getAllPostTags, deletePostTag,
        postTags, addPostTag
      }}
    >
      {props.children}
    </PostTagContext.Provider>
  );
};