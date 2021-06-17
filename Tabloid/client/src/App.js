import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { PostProvider } from "./providers/PostProvider"
import { CategoryProvider } from './providers/CategoryProvider';
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { TagProvider } from './providers/TagProvider';
import { PostTagProvider } from './providers/PostTagProvider';
import { CommentProvider } from './providers/CommentProvider';

function App() {
  return (
    <Router>
      <PostTagProvider>
        <PostProvider>
        <CategoryProvider>
          <UserProfileProvider>
              <TagProvider>
                <CategoryProvider>
                  <CommentProvider>
                  <Header />
                  </CommentProvider>
                  <ApplicationViews />
                </CategoryProvider>        
              </TagProvider>         
          </UserProfileProvider>
        </CategoryProvider>
        </PostProvider>
      </PostTagProvider>
     </Router>
  )
}

export default App;
