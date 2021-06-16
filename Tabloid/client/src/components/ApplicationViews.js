import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Hello from "./Hello";
import PostForm from "./Post/PostForm"
import PostDetails from "./Post/PostDetails";
import { UserPosts } from "./Post/UserPosts";
import PostList from "./Post/PostList";
import CategoryList from "./Category/CategoryList";
import CategoryForm from "./Category/CategoryForm";
import TagList from "./Tag/TagList"
import TagForm from "./Tag/TagForm"
import ManageTags from "./ManageTags";

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

        <Route exact path="/posts/:id">
          <PostDetails />
        </Route>

        <Route exact path="/post/add">
          <PostForm />
        </Route>

        <Route path="/post/edit/:postId">
          <PostForm />
        </Route>

        <Route path="/myposts">
          {isLoggedIn ? <UserPosts /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/categories">
          {isLoggedIn ? <CategoryList /> : <Redirect to="/login" />}
        </Route>
        <Route strict path="/tags/create">
          {isLoggedIn ? <TagForm /> : <Redirect to="/login" />}
        </Route>
        <Route strict path="/tags/edit/:tagId">
          {isLoggedIn ? <TagForm /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/categories/create">
          {isLoggedIn ? <CategoryForm /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/tags">
          {isLoggedIn ? <TagList /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/post/add-new-tag/:id">
          {isLoggedIn ? <ManageTags /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </main>
  );
};
