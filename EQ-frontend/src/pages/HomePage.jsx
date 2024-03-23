import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import UseAuth from "../hooks/UseAuth";
import "./HomePage.css";

const HomePage = () => {
  const { isLoggedIn, token, logout } = UseAuth();

  return (
    <div className="home-page">
      <div className="background-image">
        <img src="./images/geo_BG.jpg" alt="Background" />
        <div className="home-content">
          <div className="text-box">
            <h1 className="title">
              Rediscover Europe from a fresh perspective! Dive into a world of
              wonders, where every corner tells a story. Join us on an
              unforgettable journey and unlock the secrets of Europe's charm.
            </h1>
          </div>
          <div className="button-container">
            <Link to="/campaign" className="get-started-button">
              Get Started
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
