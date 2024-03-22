import React, { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import UseAuth from "../hooks/UseAuth";
import EuropeMap from "../components/EuropeMap";
import "./HomePage.css";

const HomePage = () => {
  const { isLoggedIn, token, logout } = UseAuth();
  const [loading, setLoading] = useState(true);

  console.log(isLoggedIn);

  return (
    <>
      <div className="home-page">
        <div className="europe-map">
          <EuropeMap isLoggedIn={isLoggedIn} />
        </div>
      </div>
    </>
  );
};

export default HomePage;
