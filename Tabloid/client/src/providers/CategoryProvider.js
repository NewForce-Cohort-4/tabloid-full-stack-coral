import React, { useState, createContext, useEffect, useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";
import * as firebase from "firebase/app";

export const CategoryContext = React.createContext();

export const CategoryProvider = (props) => {
    const [ categories, setCategories ] = useState([]);
    const getToken = () => firebase.auth().currentUser.getIdToken();

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
 const deleteCategory = (id) => {
   debugger;
   return getToken().then((token) =>
     fetch(`${apiUrl}/${id}`, {
       method: "DELETE",
       headers: {
         Authorization: `Bearer ${token}`,
       },
     })
   );
 };
  return (
    <CategoryContext.Provider
      value={{
        addCategory,
        getAllCategories,
        categories, deleteCategory
     }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};
