import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import PostForm from "./PostForm"
import PostDetails from "./PostDetails"
import {UserPosts} from "./UserPosts"
import PostList from "./PostList";
import CategoryList from "./CategoryList";
import CategoryForm from "./CategoryForm"
import TagList from "./TagList"
import TagForm from "./TagForm"

export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
        </Route>

        <Route path="/posts" exact>
          {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route path="/posts/:id">
          <PostDetails />
        </Route>

        <Route path="/post/add">
          <PostForm />
        </Route>

        <Route path="/posts/edit/:postId">
          <PostForm />
        </Route>
        
        <Route path="/myposts">
          {isLoggedIn ? <UserPosts /> : <Redirect to="/login" />}
        </Route>

        <Route path="/categories">
          {isLoggedIn ? <CategoryList /> : <Redirect to="/login" />}
        </Route>
        
        <Route path="/tags/create">
          {isLoggedIn ? <TagForm /> : <Redirect to="/login" />}
        </Route>

        {/* <Route path="/categories/create">
          {isLoggedIn ? <CategoryForm /> : <Redirect to="/login" />}
        </Route> */}

        <Route path="/tags">
          {isLoggedIn ? <TagList /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </main>
  );
};
