import React, { useState, createContext, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";

export const TagContext = React.createContext();

export const TagProvider = (props) => {
  const getToken = () => firebase.auth().currentUser.getIdToken();
  const [tags, setTags] = useState([])
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


  return (
    <TagContext.Provider
      value={{
        getAllTags, tags
      }}
    >
      {props.children}
    </TagContext.Provider>
  );
};
