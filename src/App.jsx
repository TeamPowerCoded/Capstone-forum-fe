import { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NavigationBar from "./components/NavigationBar";
import AboutUs from "./components/pages/AboutUs";
import Admin from "./components/pages/admin/Admin";
import Login from "./components/pages/authentication/Login";
import Register from "./components/pages/authentication/Register";
import Forum from "./components/pages/Forum";
import ForumListOfPosts from "./components/pages/ForumListOfPosts";
import ForumPost from "./components/pages/ForumPost";
import Home from "./components/pages/Home";
import UserProfile from "./components/pages/user-profile/UserProfile";

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/forum/:category" element={<ForumListOfPosts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post/:id" element={<ForumPost />} />
        <Route path="/profile" element={<UserProfile />} />

        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
