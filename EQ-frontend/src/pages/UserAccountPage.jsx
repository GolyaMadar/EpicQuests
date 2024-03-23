import React, { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import UseAuth from "../hooks/UseAuth";
import "./UserAccountPage.css";

const UserAccountPage = () => {
  const { logout, token } = UseAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_USER_API_URL}/api/accounts/profile`,
        {
          method: "GET",
          headers: {
            accept: "text/plain",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      console.log(data);

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
                        {import.meta.env.VITE_REACT_APP_FIRST_NAME}:
                      </td>
                      <td className="content">{userData.firstName}</td>
                    </tr>
                    <tr>
                      <td className="inf">
                        {import.meta.env.VITE_REACT_APP_LAST_NAME}:
                      </td>
                      <td className="content">{userData.lastName}</td>
                    </tr>
                    <tr>
                      <td className="inf">
                        {import.meta.env.VITE_REACT_APP_EMAIL}:
                      </td>
                      <td className="content">{userData.email}</td>
                    </tr>
                    <tr>
                      <td className="inf">
                        {import.meta.env.VITE_REACT_APP_BIRTH_DATE}:
                      </td>
                      <td className="content">{userData.birthDate}</td>
                    </tr>
                  </tbody>
                </table>
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
