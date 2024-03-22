import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import UserLoginPage from "./pages/UserLoginPage";
import UserAccountPage from "./pages/UserAccountPage";
import UserRegisterPage from "./pages/UserRegisterPage";
import UserForgotPassword from "./pages/UserForgotPassword";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-components">
        <div className="app-navbar-component">
          <Navbar />
        </div>
        <div className="app-routes-component">
          <div className="routes">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route element={<RequireAuth />}>
                <Route path="/account" element={<UserAccountPage />} />
              </Route>

              <Route path="/user/login" element={<UserLoginPage />} />
              <Route path="/user/register" element={<UserRegisterPage />} />
              <Route
                path="/user/forgot-password"
                element={<UserForgotPassword />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
