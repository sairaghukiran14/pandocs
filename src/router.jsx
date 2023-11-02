import React, { useEffect } from "react";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";

import Dashboard from "./pages/Dashboard";
import Editor from "./components/Editor";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<PrivateRoute />}>
            <Route path="/" exact element={<Dashboard />} />
            <Route path="/Profile" exact element={<Profile />} />
            <Route path="/documents/:id" element={<Editor />} exact/>
          </Route>
          <Route index={true} path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
