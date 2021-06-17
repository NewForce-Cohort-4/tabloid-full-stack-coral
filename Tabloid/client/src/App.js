import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { PostProvider } from "./providers/PostProvider"
import { CategoryProvider } from './providers/CategoryProvider';
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { TagProvider } from './providers/TagProvider';
import { PostTagProvider } from './providers/PostTagProvider';

function App() {
  return (
    <Router>
      <PostTagProvider>
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
      </PostTagProvider>
    </Router>
  );
}

export default App;
