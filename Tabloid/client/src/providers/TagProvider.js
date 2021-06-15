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

  return (
    <TagContext.Provider
      value={{
        getAllTags,
        tags, addTag
      }}
    >
      {props.children}
    </TagContext.Provider>
  );
};
