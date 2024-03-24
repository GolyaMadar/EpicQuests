import { useState } from "react";
import { emailRegex, passwordRegex } from "../hooks/RegexPatterns";
import GoogleAuth from "../components/GoogleLogin";
import LoginRegisterTooltip from "../components/LoginRegisterTooltip";
import UseAuth from "../hooks/UseAuth";
import "./UserLoginPage.css";
import GoogleAuth from "../components/GoogleLogin";

const UserLoginPage = () => {
  const { login, isLoggedIn } = UseAuth();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [emailInputError, setEmailInputError] = useState("");
  const [passwordInputError, setPasswordInputError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  if (isLoggedIn) window.location.href = "/";

  const handleLogin = (e) => {
    e.preventDefault();

    let isEmailValid = email.match(emailRegex);
    let isPasswordValid = password.match(passwordRegex);
    let hasError = false;

    if (!isEmailValid) {
      setEmailError(`${import.meta.env.VITE_REACT_APP_INVALID_EMAIL_FORMAT}`);
      setEmailInputError(email);
      hasError = true;
    } else {
      setEmailError("");
    }

    if (!isPasswordValid) {
      setPasswordError(
        `${import.meta.env.VITE_REACT_APP_INVALID_PASSWORD_FORMAT}`
      );
      setPasswordInputError(password);
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (!hasError) {
      setError("");
      handleLoggingiIn(email, password);
    } else {
      setSuccessMessage("");
      setError(`${import.meta.env.VITE_REACT_APP_FIX_ERRORS}`);
    }
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    if (name === `${import.meta.env.VITE_REACT_APP_EMAIL}`) {
      setEmail(value);
      setEmailError("");
      setError("");
    } else if (name === `${import.meta.env.VITE_REACT_APP_PASSWORD}`) {
      setPassword(value);
      setPasswordError("");
      setError("");
    }
  };

  const apiUrl = `${
    import.meta.env.VITE_REACT_USER_API_URL
  }/api/accounts/login`;
  const handleLoggingiIn = async (userEmail, userPassword) => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          accept: "text/plain",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          password: userPassword,
        }),
      });

      const responseData = await response.json();
      console.log(responseData);
      const access_token = responseData.token;

      if (response.ok) {
        if (response.status === 200) {
          setSuccessMessage(import.meta.env.VITE_REACT_APP_LOGIN_SUCCESSFUL);
          login(access_token);
          window.location.href = "/";
        } else {
          setSuccessMessage("");
          setError("Unexpected response: " + response.status);
        }
      } else if (response.status === 401) {
        setSuccessMessage("");
        setError(responseData.detail);
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="user-login">
      <div className="login">
        <form onSubmit={handleLogin}>
          <h1>{import.meta.env.VITE_REACT_APP_LOGIN}</h1>
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
          </div>

          <div className="password-container">
            <div className="password-h3-valid">
              <h3>{import.meta.env.VITE_REACT_APP_PASSWORD}</h3>
              <LoginRegisterTooltip
                tooltipText={import.meta.env.VITE_REACT_APP_VALID_PASSWORD}
                regexDetails={[
                  {
                    label: import.meta.env
                      .VITE_REACT_APP_VALID_PASSWORD_REGEX_MIN_CHARACTERS_LABEL,
                    isValid: password.replace(/\s/g, "").length >= 8,
                  },
                  {
                    label: import.meta.env
                      .VITE_REACT_APP_VALID_PASSWORD_REGEX_UPPERCASE_LABEL,
                    isValid: /[A-Z]/.test(password),
                  },
                  {
                    label: import.meta.env
                      .VITE_REACT_APP_VALID_PASSWORD_REGEX_LOWERCASE_LABEL,
                    isValid: /[a-z]/.test(password),
                  },
                  {
                    label: import.meta.env
                      .VITE_REACT_APP_VALID_PASSWORD_REGEX_NUMBER_LABEL,
                    isValid: /[0-9]/.test(password),
                  },
                  {
                    label: import.meta.env
                      .VITE_REACT_APP_VALID_PASSWORD_REGEX_SPECIAL_CHARACTER_LABEL,
                    isValid: /[!@#$%^&*_=`~-]/.test(password),
                  },
                  {
                    label: import.meta.env
                      .VITE_REACT_APP_VALID_EMAIL_REGEX_WHITE_SPACE_LABEL,
                    isValid: !/\s/.test(password),
                  },
                ]}
              >
                {passwordError === import.meta.env.VITE_REACT_APP_VALID ? (
                  <i className="bx bx-check-circle"></i>
                ) : (
                  passwordError && <i className="bx bx-error-circle"></i>
                )}
              </LoginRegisterTooltip>
            </div>

            <div className="input-box">
              <input
                type={showPassword ? "text" : "password"}
                name={import.meta.env.VITE_REACT_APP_PASSWORD}
                placeholder={import.meta.env.VITE_REACT_APP_PASSWORD}
                onCopy={(e) => e.preventDefault()}
                onPaste={(e) => e.preventDefault()}
                onChange={(e) => {
                  setPassword(e.target.value);
                  handleInputChange(e);
                  if (!e.target.value) {
                    setPasswordError("");
                  } else if (!e.target.value.match(passwordRegex)) {
                    setPasswordError(
                      `${
                        import.meta.env.VITE_REACT_APP_INVALID_PASSWORD_FORMAT
                      }`
                    );
                  } else {
                    setPasswordError(`${import.meta.env.VITE_REACT_APP_VALID}`);
                  }
                }}
                className={`${
                  passwordInputError === password &&
                  password.length > 0 &&
                  "error-input"
                }`}
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle-button"
              >
                {showPassword ? (
                  <i className="bx bx-show"></i>
                ) : (
                  <i className="bx bx-hide"></i>
                )}
              </div>
            </div>
          </div>

          <div className="remember-forgot">
            <label>
              <input
                type="checkbox"
                className="checkbox"
                checked={rememberMe}
                onChange={() => {
                  if (!rememberMe) console.log("remember");
                  setRememberMe(!rememberMe);
                }}
              />
              {import.meta.env.VITE_REACT_APP_REMEMBER_ME}
            </label>
            <a href="/user/forgot-password">
              {import.meta.env.VITE_REACT_APP_FORGOT_PASSWORD}
              {import.meta.env.VITE_REACT_APP_QUESTION_MARK}
            </a>
          </div>

          <div className="button-error-message-container">
            <button type="submit" className="login-button">
              {import.meta.env.VITE_REACT_APP_LOGIN}
            </button>

            {successMessage && (
              <p
                className={`success-message ${
                  successMessage ? "visible" : "hidden"
                }`}
              >
                {successMessage}
              </p>
            )}

            {error && (
              <p className={`error-message ${error ? "visible" : "hidden"}`}>
                {error}
              </p>
            )}
          </div>

<<<<<<< Updated upstream
          <GoogleAuth/>
=======
          <div className="google-implementation">
            <GoogleAuth />
          </div>
>>>>>>> Stashed changes

          <div className="register-link">
            {import.meta.env.VITE_REACT_APP_NO_ACCOUNT}
            {import.meta.env.VITE_REACT_APP_QUESTION_MARK}{" "}
            <a href="/user/register">
              {import.meta.env.VITE_REACT_APP_REGISTER}
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserLoginPage;
