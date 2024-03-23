import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import DrawPage from "./pages/DrawPage";
import CampaignPage from "./pages/CampaignPage";
import CampaignPlayPage from "./pages/CampaignPlayPage";
import HistoryPage from "./pages/HistoryPage";
import UserLoginPage from "./pages/UserLoginPage";
import UserAccountPage from "./pages/UserAccountPage";
import UserRegisterPage from "./pages/UserRegisterPage";
import UserForgotPassword from "./pages/UserForgotPassword";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_REACT_GOOGLE_CLIENT_ID}>
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
                <Route element={<RequireAuth />}>
                  <Route path="/campaign" element={<CampaignPage />} />
                </Route>
                <Route element={<RequireAuth />}>
                  <Route path="/history" element={<HistoryPage />} />
                </Route>
                <Route
                  path="/campaign/:campaign_id/play"
                  element={<CampaignPlayPage />}
                />
                <Route path="/draw" element={<DrawPage />} />

                <Route path="/user/login" element={<UserLoginPage />} />
                <Route path="/user/register" element={<UserRegisterPage />} />
                <Route
                  path="/user/forgot-password"
                  element={<UserForgotPassword />}
                />
              </Routes>
            </div>
          </div>
          <div className="app-footer-component">
            <Footer />
          </div>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
