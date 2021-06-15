import React, { useState } from "react";
import * as firebase from "firebase/app";

export const CategoryContext = React.createContext();

export const CategoryProvider = (props) => {
  const [categories, setCategories] = useState([]);
  const getToken = () => firebase.auth().currentUser.getIdToken();

  const apiUrl = "https://localhost:5001/api/category";

  const getAllCategories = () => {
    return fetch(apiUrl, {
        method: "GET",
    }).then((res) => res.json())
    .then(setCategories);
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
    <CategoryContext.Provider value={{ categories, getAllCategories, addCategory }}>
      {props.children}
    </CategoryContext.Provider>
  )
}
