import React, { useState, useEffect } from "react";
import UseAuth from "../hooks/UseAuth";
import "./FavoritesPage.css";

const FavoritesPage = () => {
  const { isLoggedIn, token } = UseAuth();

  return <div>FavoritesPage</div>;
};

export default FavoritesPage;
