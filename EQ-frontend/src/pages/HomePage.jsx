import React, { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import UseAuth from "../hooks/UseAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./HomePage.css";

const HomePage = () => {
  const { isLoggedIn, token, logout } = UseAuth();
  const [favoriteApartments, setFavoriteApartments] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <>
      <div className="toast">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>

      <div className="home-page"></div>
    </>
  );
};

export default HomePage;
