import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { PostProvider } from "./providers/PostProvider"
import { CategoryProvider } from './providers/CategoryProvider';
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { TagProvider } from './providers/TagProvider';

function App() {
  return (
    <Router>
      <PostProvider>
      <CategoryProvider>
        <UserProfileProvider>
            <TagProvider>
              <CategoryProvider>
                <Header />
                <ApplicationViews />
              </CategoryProvider>        
            </TagProvider>         
        </UserProfileProvider>
      </CategoryProvider>
      </PostProvider>
    </Router>
  );
}

export default App;
