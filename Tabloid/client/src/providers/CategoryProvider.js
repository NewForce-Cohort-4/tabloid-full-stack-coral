<<<<<<< HEAD
import React, { useState } from "react";
import * as firebase from "firebase/app";
=======
import React, { useState, createContext, useEffect, useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";
>>>>>>> main

export const CategoryContext = React.createContext();

export const CategoryProvider = (props) => {
<<<<<<< HEAD
  const [categories, setCategories] = useState([]);
  const getToken = () => firebase.auth().currentUser.getIdToken();

  const apiUrl = "https://localhost:5001/api/category";

  const getAllCategories = () => {
    return fetch(apiUrl, {
        method: "GET",
    }).then((res) => res.json())
    .then(setCategories);
=======
    const [ categories, setCategories ] = useState([]);
    const { getToken } = useContext(UserProfileContext);

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
>>>>>>> main
  };

  const addCategory = (category) => {
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
<<<<<<< HEAD
    <CategoryContext.Provider value={{ categories, getAllCategories, addCategory }}>
      {props.children}
    </CategoryContext.Provider>
  )
}
=======
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
>>>>>>> main
