import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { PostProvider } from "./providers/PostProvider"
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";

function App() {
  return (
    <Router>
      <PostProvider>
        <UserProfileProvider>
          <Header />
          <ApplicationViews />
        </UserProfileProvider>
      </PostProvider>
      
    </Router>
  );
}

export default App;
