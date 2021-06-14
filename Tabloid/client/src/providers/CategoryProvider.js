import React, { useState, createContext, useEffect, useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";
import firebase from "firebase/app";
import "firebase/auth";

export const CategoryContext = React.createContext();

export const CategoryProvider = (props) => {
    const [ categories, setCategories ] = useState([]);
    const { getToken } = useContext(UserProfileContext);
    // const getToken = () => firebase.auth().currentUser.getIdToken();

    const apiUrl = "https://localhost:5001/api/Category";

    const getAllCategories = () => {
        return getToken().then((token) => 
        fetch(apiUrl, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`
            }
        }).then((res) => res.json()))
        .then(setCategories);
  };
  
  const addCategory = (category) => {
    debugger
    return getToken().then((token) =>
      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(category),
      })
    );
  };


  return (
    <CategoryContext.Provider
      value={{
        addCategory,
        getAllCategories,
        categories
     }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};