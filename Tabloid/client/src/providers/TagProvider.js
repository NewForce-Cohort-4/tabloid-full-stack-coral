import React, { useState, createContext, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";

export const TagContext = React.createContext();

export const TagProvider = (props) => {
  const getToken = () => firebase.auth().currentUser.getIdToken();
  const [tags, setTags] = useState([]);
  const apiUrl = "https://localhost:5001/api/tag";

 const getAllTags = () => {
   return getToken()
     .then((token) =>
       fetch(apiUrl, {
         method: "GET",
         headers: {
           Authorization: `Bearer ${token}`,
         },
       }).then((res) => res.json())
     )
     .then(setTags);
  };
  const getTag = (id) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json())
    );
  };
  const deleteTag = (id) => {
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

    const addTag = (tag) => {
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

    const updateTag = (tagToUpdate) => {
      return getToken().then((token) =>
        fetch(`${apiUrl}/${tagToUpdate.id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tagToUpdate),
        })
      );
    };
  
  return (
    <TagContext.Provider
      value={{
        getAllTags,
        deleteTag,
        tags,
        addTag,
        updateTag,
        getTag,
      }}
    >
      {props.children}
    </TagContext.Provider>
  );
};
