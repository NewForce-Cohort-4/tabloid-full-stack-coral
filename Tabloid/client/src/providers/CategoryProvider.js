import React, { useState } from "react";

export const CategoryContext = React.createContext();

export const CategoryProvider = (props) => {
  const [categories, setCategories] = useState([]);

  const apiUrl = "https://localhost:5001/api/category";

  const getAllCategories = () => {
    return fetch(apiUrl, {
        method: "GET",
    }).then((res) => res.json())
    .then(setCategories);
  };

  return (
    <CategoryContext.Provider value={{ categories, getAllCategories }}>
      {props.children}
    </CategoryContext.Provider>
  )
}