import React, { useState } from "react";
import { emailRegex } from "../hooks/RegexPatterns";
import LoginRegisterTooltip from "../components/LoginRegisterTooltip";
import "./UserForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [message, setMessage] = useState("");

  const [emailInputError, setEmailInputError] = useState("");
  let hasError = false;

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    let isEmailValid = email.match(emailRegex);

    try {
      if (!isEmailValid) {
        setEmailError(`${import.meta.env.VITE_REACT_APP_INVALID_EMAIL_FORMAT}`);
        setEmailInputError(email);
        hasError = true;
      } else {
        setEmailError("");
        hasError = false;
      }
      setMessage(import.meta.env.VITE_REACT_APP_RESET_SUCCESS);
    } catch (error) {
      setMessage(import.meta.env.VITE_REACT_APP_RESET_ERROR);
    }

    if (!hasError) {
      setMessage(`${import.meta.env.VITE_REACT_APP_RESET_SUCCESS}`);
    } else if (!isEmailValid) {
      setMessage(`${import.meta.env.VITE_REACT_APP_INVALID_EMAIL_FORMAT}`);
    } else {
      setMessage(`${import.meta.env.VITE_REACT_APP_RESET_ERROR}`);
    }
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    if (name === `${import.meta.env.VITE_REACT_APP_EMAIL}`) {
      setEmail(value);
      setEmailError("");
      setMessage("");
    }
  };

  return (
    <div className="user-forgot-password">
      <div className="forgot-password">
        <form onSubmit={handleForgotPassword}>
          <h1>{import.meta.env.VITE_REACT_APP_FORGOT_PASSWORD}</h1>
          <div className="email-container">
            <div className="email-h3-valid">
              <h3>{import.meta.env.VITE_REACT_APP_EMAIL_ADDRESS}</h3>
              <LoginRegisterTooltip
                tooltipText={import.meta.env.VITE_REACT_APP_VALID_EMAIL_ADDRESS}
                regexDetails={[
                  {
                    label: import.meta.env
                      .VITE_REACT_APP_VALID_EMAIL_REGEX_AT_LABEL,
                    isValid: email.includes("@"),
                  },
                  {
                    label: import.meta.env
                      .VITE_REACT_APP_VALID_EMAIL_REGEX_DOMAIN_NAME_LABEL,
                    isValid:
                      email.includes(".") &&
                      /[A-Za-z]{2,}$/.test(email.split(".")[1]),
                  },
                  {
                    label: import.meta.env
                      .VITE_REACT_APP_VALID_EMAIL_REGEX_WHITE_SPACE_LABEL,
                    isValid: !/\s/.test(email),
                  },
                ]}
              >
                {emailError === `${import.meta.env.VITE_REACT_APP_VALID}` ? (
                  <i className="bx bx-check-circle"></i>
                ) : (
                  emailError && <i className="bx bx-error-circle"></i>
                )}
              </LoginRegisterTooltip>
            </div>
          </div>
          <div className="input-box">
            <input
              type="text"
              name={import.meta.env.VITE_REACT_APP_EMAIL}
              placeholder={import.meta.env.VITE_REACT_APP_EMAIL}
              onChange={(e) => {
                setEmail(e.target.value);
                handleInputChange(e);
                if (!e.target.value) {
                  setEmailError("");
                } else if (!e.target.value.match(emailRegex)) {
                  setEmailError(
                    `${import.meta.env.VITE_REACT_APP_INVALID_EMAIL_FORMAT}`
                  );
                } else {
                  setEmailError(`${import.meta.env.VITE_REACT_APP_VALID}`);
                }
              }}
              className={`${
                emailInputError === email && email.length > 0 && "error-input"
              }`}
            />
            <i className="bx bxs-envelope"></i>
          </div>
          <div className="button-error-message-container">
            <button type="submit" className="forgot-password-button">
              {import.meta.env.VITE_REACT_APP_RESET}
            </button>

            {message && (
              <p
                className={`error-message ${message ? "visible" : "hidden"} ${
                  message.includes("successfully") ? "green" : "red"
                }`}
              >
                {message}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
