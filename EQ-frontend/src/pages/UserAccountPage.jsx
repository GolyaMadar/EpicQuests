import React, { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { FaPencilAlt } from "react-icons/fa";
import { Navigate } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";
import "./UserAccountPage.css";

const UserAccountPage = () => {
  const { logout, token } = UseAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_USER_API_URL}/users/me/`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token.access_token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setUserData(data);
      } else {
        handleLogout();
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="user-account-page">
          <h3 className="detail-title">
            {import.meta.env.VITE_REACT_APP_ACCOUNT_DETAILS}
          </h3>
          <div className="user-details-logout-container">
            <div className="user-details-container">
              <div className="user-details">
                <table className="user-details-table">
                  <tbody>
                    <tr>
                      <td className="inf">
                        {import.meta.env.VITE_REACT_APP_NAME}:
                      </td>
                      <td>{userData.name}</td>
                    </tr>
                    <tr>
                      <td className="inf">
                        {import.meta.env.VITE_REACT_APP_EMAIL}:
                      </td>
                      <td>{userData.email}</td>
                    </tr>
                    <tr>
                      <td className="inf">
                        {import.meta.env.VITE_REACT_APP_BIRTH_DATE}:
                      </td>
                      <td>{userData.birth_date}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="client-container">
                <p>
                  {import.meta.env.VITE_REACT_APP_OCS}{" "}
                  {userData.account_created.split("-")[0]}
                </p>
              </div>
            </div>
            <div className="user-logout-container">
              <div className="logout-button-container">
                <button onClick={handleLogout} className="logout-button">
                  {import.meta.env.VITE_REACT_APP_LOGOUT}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserAccountPage;
