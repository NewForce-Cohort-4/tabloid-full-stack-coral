import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { PostProvider } from "./providers/PostProvider"
import { CategoryProvider } from "./providers/CategoryProvider"
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { TagProvider } from './providers/TagProvider';
function App() {
  return (
    <Router>
      <PostProvider>
        <UserProfileProvider>
         
            <TagProvider>
              <Header />
              <ApplicationViews />
            </TagProvider>
         
        </UserProfileProvider>
      </PostProvider>
    </Router>
  );
}

export default App;
