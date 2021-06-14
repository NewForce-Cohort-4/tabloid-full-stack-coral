// import React, { useState, createContext, useEffect } from "react";
// import firebase from "firebase/app";
// import "firebase/auth";

// export const CategoryContext = React.createContext();

// export const CategoryProvider = (props) => {
//   const getToken = () => firebase.auth().currentUser.getIdToken();

//   const apiUrl = "https://localhost:5001/api/category";

//   const addCategory = (category) => {
//     debugger
//     return getToken().then((token) =>
//       fetch(apiUrl, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(category),
//       })
//     );
//   };


//   return (
//     <CategoryContext.Provider
//       value={{
//         addCategory }}
//     >
//       {props.children}
//     </CategoryContext.Provider>
//   );
// };
