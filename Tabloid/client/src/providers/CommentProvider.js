import React, { useState, createContext, useEffect, useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";
import * as firebase from "firebase/app";

export const CommentContext = React.createContext();

export const CommentProvider = (props) => {
  const [comments, setComments] = useState([]);
  const getToken = () => firebase.auth().currentUser.getIdToken();

  const apiUrl = "https://localhost:5001/api/Comment";

  const getCommentsByPostId = (postId) => {
    debugger
    return getToken()
      .then((token) =>
        fetch(`${apiUrl}/getbypost/${postId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => res.json())
      )
      .then(setComments);
  };
  return (
    <CommentContext.Provider
      value={{
        getCommentsByPostId,
        comments,
      }}
    >
      {props.children}
    </CommentContext.Provider>
  );
};
