import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { PostProvider } from "./providers/PostProvider"
import { CategoryProvider } from './providers/CategoryProvider';
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { TagProvider } from './providers/TagProvider';
import { CommentProvider } from './providers/CommentProvider';
function App() {
  return (
    <Router>
      <PostProvider>
        <CategoryProvider>
          <UserProfileProvider>
            <TagProvider>
              <CategoryProvider>
                <CommentProvider>
                  <Header />
                  <ApplicationViews />
                </CommentProvider>
              </CategoryProvider>
            </TagProvider>
          </UserProfileProvider>
        </CategoryProvider>
      </PostProvider>
    </Router>
  );
}

export default App;
