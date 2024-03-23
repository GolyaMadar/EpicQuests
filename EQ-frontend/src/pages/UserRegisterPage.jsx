import React, { useState } from "react";
import { emailRegex, passwordRegex } from "../hooks/RegexPatterns";
import LoginRegisterTooltip from "../components/LoginRegisterTooltip";
import UseAuth from "../hooks/UseAuth";
import "./UserRegisterPage.css";

function getMaxBirthDate() {
  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setFullYear(today.getFullYear() - 2);
  const month = maxDate.getMonth() + 1;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay =
    maxDate.getDate() < 10 ? `0${maxDate.getDate()}` : maxDate.getDate();
  return `${maxDate.getFullYear()}-${formattedMonth}-${formattedDay}`;
}

function calculateAge(birthDate) {
  const currentDate = new Date();
  const inputDate = new Date(birthDate);

  let ageDifference = currentDate.getFullYear() - inputDate.getFullYear();

  if (
    currentDate.getMonth() < inputDate.getMonth() ||
    (currentDate.getMonth() === inputDate.getMonth() &&
      currentDate.getDate() < inputDate.getDate())
  ) {
    ageDifference--;
  }

  return ageDifference;
}

const UserRegisterPage = () => {
  const { login, isLoggedIn } = UseAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthDateError, setBirthDateError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [firstNameInputError, setFirstNameInputError] = useState("");
  const [lastNameInputError, setLastNameInputError] = useState("");
  const [emailInputError, setEmailInputError] = useState("");
  const [passwordInputError, setPasswordInputError] = useState("");
  const [ConfirmpasswordInputError, setConfirmPasswordInputError] =
    useState("");
  const [isUnderAge, setIsUnderAge] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  if (isLoggedIn) window.location.href = "/";

  const handleRegister = (e) => {
    e.preventDefault();

    let hasError = false;

    let isFirstNameValid = firstName.trim().length > 0;
    let isLastNameValid = lastName.trim().length > 0;
    let isEmailValid = email.match(emailRegex);
    let isPasswordValid = password.match(passwordRegex);
    let isConfirmPasswordValid =
      confirmPassword === password && confirmPassword.match(passwordRegex);

    if (!isFirstNameValid) {
      setFirstNameError(import.meta.env.VITE_REACT_APP_FIRST_NAME_REQUIRED);
      setFirstNameInputError(firstName);
      hasError = true;
    } else {
      setFirstNameError("");
    }

    if (!isLastNameValid) {
      setLastNameError(import.meta.env.VITE_REACT_APP_LAST_NAME_REQUIRED);
      setLastNameInputError(lastName);
      hasError = true;
    } else {
      setLastNameError("");
    }

    if (!isEmailValid) {
      setEmailError(import.meta.env.VITE_REACT_APP_INVALID_EMAIL_FORMAT);
      setEmailInputError(email);
      hasError = true;
    } else {
      setEmailError("");
    }

    if (!isPasswordValid) {
      setPasswordError(import.meta.env.VITE_REACT_APP_INVALID_PASSWORD_FORMAT);
      setPasswordInputError(password);
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (!isConfirmPasswordValid) {
      setConfirmPasswordError(
        import.meta.env.VITE_REACT_APP_INVALID_CONFIRM_PASSWORD_FORMAT
      );
      setConfirmPasswordInputError(confirmPassword);
      hasError = true;
    } else {
      setConfirmPasswordError("");
    }

    if (!birthDate) {
      setBirthDateError(import.meta.env.VITE_REACT_APP_BIRTH_DATE_REQUIRED);
    } else if (isUnderAge) {
      setBirthDateError(import.meta.env.VITE_REACT_APP_AGE_REQUIRED);
    } else {
      setBirthDateError("");
    }

    if (!hasError) {
      setError("");
      handleRegistration(firstName, lastName, email, password, birthDate);
    } else {
      setSuccessMessage("");
      setError(import.meta.env.VITE_REACT_APP_FIX_ERRORS);
    }
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    if (name === `${import.meta.env.VITE_REACT_APP_FIRST_NAME}`) {
      setFirstName(value);
      setError("");
    } else if (name === `${import.meta.env.VITE_REACT_APP_LAST_NAME}`) {
      setLastName(value);
      setError("");
    } else if (name === `${import.meta.env.VITE_REACT_APP_EMAIL}`) {
      setEmail(value);
      setError("");
    } else if (name === `${import.meta.env.VITE_REACT_APP_PASSWORD}`) {
      setPassword(value);
      setError("");
    } else if (name === `${import.meta.env.VITE_REACT_APP_CP}`) {
      setConfirmPassword(value);
      setError("");
    } else if (name === `${import.meta.env.VITE_REACT_APP_BIRTH_DATE}`) {
      setBirthDate(value);
      setError("");
    }
  };

  const apiUrl = `${
    import.meta.env.VITE_REACT_USER_API_URL
  }/api/accounts/register`;
  const handleRegistration = async (
    firstName,
    lastName,
    userEmail,
    userPassword,
    userBirthDate
  ) => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          accept: "text/plain",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: userEmail,
          password: userPassword,
          birthDate: userBirthDate,
        }),
      });

      const responseData = await response.json();
      const access_token = responseData.token;

      if (response.ok) {
        setSuccessMessage(
          import.meta.env.VITE_REACT_APP_REGISTRATION_SUCCESSFUL
        );
        login(access_token);
        window.location.href = "/";
      } else if (response.status === 400) {
        setSuccessMessage("");
        setError(responseData.errors[0]);
      } else {
        setSuccessMessage("");
        setError("Error: " + response.status);
      }
    } catch (error) {
      console.log(error);
      setError(error.toISOString());
    }
  };

  return (
    <div className="user-register">
      <div className="register">
        <form onSubmit={handleRegister}>
          <h1>{import.meta.env.VITE_REACT_APP_REGISTER_LAYOUT}</h1>
          <div className="name-container">
            <div className="name-h3-valid">
              <h3>{import.meta.env.VITE_REACT_APP_FIRST_NAME}</h3>
              <LoginRegisterTooltip
                tooltipText={import.meta.env.VITE_REACT_APP_VALID_FIRST_NAME}
                regexDetails={[
                  {
                    label: import.meta.env.VITE_REACT_APP_FIRST_NAME_REQUIRED,
                    isValid: firstName.length > 0,
                  },
                ]}
              >
                {firstNameError === import.meta.env.VITE_REACT_APP_VALID ? (
                  <i className="bx bx-check-circle"></i>
                ) : (
                  firstNameError && <i className="bx bx-error-circle"></i>
                )}
              </LoginRegisterTooltip>
            </div>

            <div className="input-box">
              <input
                type="text"
                name={import.meta.env.VITE_REACT_APP_FIRST_NAME}
                placeholder={import.meta.env.VITE_REACT_APP_FIRST_NAME}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  setFirstNameError("");
                  handleInputChange(e);
                  if (!e.target.value) {
                    setFirstNameError("");
                  } else {
                    setFirstNameError(import.meta.env.VITE_REACT_APP_VALID);
                  }
                }}
                className={`${
                  firstNameInputError === firstName &&
                  firstName.length > 0 &&
                  "error-input"
                }`}
              />
              <i className="bx bx-user"></i>
            </div>
          </div>
          <div className="name-container">
            <div className="name-h3-valid">
              <h3>{import.meta.env.VITE_REACT_APP_LAST_NAME}</h3>
              <LoginRegisterTooltip
                tooltipText={import.meta.env.VITE_REACT_APP_VALID_LAST_NAME}
                regexDetails={[
                  {
                    label: import.meta.env.VITE_REACT_APP_LAST_NAME_REQUIRED,
                    isValid: lastName.length > 0,
                  },
                ]}
              >
                {lastNameError === import.meta.env.VITE_REACT_APP_VALID ? (
                  <i className="bx bx-check-circle"></i>
                ) : (
                  lastNameError && <i className="bx bx-error-circle"></i>
                )}
              </LoginRegisterTooltip>
            </div>

            <div className="input-box">
              <input
                type="text"
                name={import.meta.env.VITE_REACT_APP_LAST_NAME}
                placeholder={import.meta.env.VITE_REACT_APP_LAST_NAME}
                onChange={(e) => {
                  setLastName(e.target.value);
                  setLastNameError("");
                  handleInputChange(e);
                  if (!e.target.value) {
                    setLastNameError("");
                  } else {
                    setLastNameError(import.meta.env.VITE_REACT_APP_VALID);
                  }
                }}
                className={`${
                  lastNameInputError === lastName &&
                  lastName.length > 0 &&
                  "error-input"
                }`}
              />
              <i className="bx bx-user"></i>
            </div>
          </div>
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
                {emailError === import.meta.env.VITE_REACT_APP_VALID ? (
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
                  setEmailError("");
                  handleInputChange(e);
                  if (!e.target.value) {
                    setEmailError("");
                  } else if (!e.target.value.match(emailRegex)) {
                    setEmailError(
                      import.meta.env.VITE_REACT_APP_INVALID_EMAIL_FORMAT
                    );
                  } else {
                    setEmailError(import.meta.env.VITE_REACT_APP_VALID);
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
                  setPasswordError("");
                  handleInputChange(e);
                  if (!e.target.value) {
                    setPasswordError("");
                  } else if (!e.target.value.match(passwordRegex)) {
                    setPasswordError(
                      import.meta.env.VITE_REACT_APP_INVALID_PASSWORD_FORMAT
                    );
                  } else {
                    setPasswordError(import.meta.env.VITE_REACT_APP_VALID);
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

          <div className="confirm-password-container">
            <div
              className={`confirm-password-h3-valid ${
                confirmPasswordError ? "error-text" : ""
              }`}
            >
              <h3>{import.meta.env.VITE_REACT_APP_CONFIRM_PASSWORD}</h3>
              <LoginRegisterTooltip
                tooltipText={
                  import.meta.env.VITE_REACT_APP_VALID_CONFIRM_PASSWORD_FORMAT
                }
                regexDetails={[
                  {
                    label: import.meta.env
                      .VITE_REACT_APP_VALID_PASSWORD_REGEX_MIN_CHARACTERS_LABEL,
                    isValid: confirmPassword.replace(/\s/g, "").length >= 8,
                  },
                  {
                    label: import.meta.env
                      .VITE_REACT_APP_VALID_PASSWORD_REGEX_UPPERCASE_LABEL,
                    isValid: /[A-Z]/.test(confirmPassword),
                  },
                  {
                    label: import.meta.env
                      .VITE_REACT_APP_VALID_PASSWORD_REGEX_LOWERCASE_LABEL,
                    isValid: /[a-z]/.test(confirmPassword),
                  },
                  {
                    label: import.meta.env
                      .VITE_REACT_APP_VALID_PASSWORD_REGEX_NUMBER_LABEL,
                    isValid: /[0-9]/.test(confirmPassword),
                  },
                  {
                    label: import.meta.env
                      .VITE_REACT_APP_VALID_PASSWORD_REGEX_SPECIAL_CHARACTER_LABEL,
                    isValid: /[!@#$%^&*_=`~-]/.test(confirmPassword),
                  },
                  {
                    label: import.meta.env
                      .VITE_REACT_APP_VALID_EMAIL_REGEX_WHITE_SPACE_LABEL,
                    isValid: !/\s/.test(confirmPassword),
                  },
                  {
                    label: import.meta.env
                      .VITE_REACT_APP_VALID_PASSWORD_REGEX_MATCHING_PASSWORD,
                    isValid:
                      confirmPassword === password &&
                      confirmPassword.length > 0,
                  },
                ]}
              >
                {confirmPasswordError ===
                import.meta.env.VITE_REACT_APP_VALID ? (
                  <i className="bx bx-check-circle"></i>
                ) : (
                  confirmPasswordError && <i className="bx bx-error-circle"></i>
                )}
              </LoginRegisterTooltip>
            </div>

            <div
              className={`input-box ${
                confirmPassword.length === 0 ? "error-input" : ""
              }`}
            >
              <input
                type={showConfirmPassword ? "text" : "password"}
                name={import.meta.env.VITE_REACT_APP_CP}
                placeholder={import.meta.env.VITE_REACT_APP_CONFIRM_PASSWORD}
                onCopy={(e) => e.preventDefault()}
                onPaste={(e) => e.preventDefault()}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  handleInputChange(e);
                  if (!e.target.value) {
                    setConfirmPasswordError("");
                  } else if (
                    !(
                      e.target.value.match(passwordRegex) &&
                      e.target.value === password
                    )
                  ) {
                    setConfirmPasswordError(
                      import.meta.env
                        .VITE_REACT_APP_INVALID_CONFIRM_PASSWORD_FORMAT
                    );
                  } else {
                    setConfirmPasswordError(
                      import.meta.env.VITE_REACT_APP_VALID
                    );
                  }
                }}
                className={`${
                  ConfirmpasswordInputError === confirmPassword &&
                  confirmPassword.length > 0 &&
                  "error-input"
                }`}
              />
              <div
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="password-toggle-button"
              >
                {showConfirmPassword ? (
                  <i className="bx bx-show"></i>
                ) : (
                  <i className="bx bx-hide"></i>
                )}
              </div>
            </div>
          </div>

          <div className="birth-date-container">
            <div className="birth-date-h3-valid">
              <h3>{import.meta.env.VITE_REACT_APP_BIRTH_DATE}</h3>
              <LoginRegisterTooltip
                tooltipText={import.meta.env.VITE_REACT_APP_VALID_BIRTH_DATE}
                regexDetails={[
                  {
                    label: import.meta.env.VITE_REACT_APP_BIRTH_DATE_REQUIRED,
                    isValid: birthDate !== "",
                  },
                ]}
              >
                {birthDateError === import.meta.env.VITE_REACT_APP_VALID ? (
                  <i className="bx bx-check-circle"></i>
                ) : (
                  birthDateError && <i className="bx bx-error-circle"></i>
                )}
              </LoginRegisterTooltip>
            </div>

            <div className={`input-box ${birthDateError ? "error-input" : ""}`}>
              <input
                type="date"
                name={import.meta.env.VITE_REACT_APP_BIRTH_DATE}
                max={getMaxBirthDate()}
                onChange={(e) => {
                  setBirthDate(e.target.value);
                  setBirthDateError("");
                  handleInputChange(e);
                  if (!e.target.value) {
                    setIsUnderAge(false);
                  } else if (calculateAge(e.target.value) < 0) {
                    setBirthDateError(
                      import.meta.env.VITE_REACT_APP_AGE_REQUIRED
                    );
                    setIsUnderAge(true);
                  } else {
                    setBirthDateError(import.meta.env.VITE_REACT_APP_VALID);
                  }
                }}
              />
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
            <div className="register-link">
              {import.meta.env.VITE_REACT_APP_ALREADY_ACCOUNT}
              {import.meta.env.VITE_REACT_APP_QUESTION_MARK}{" "}
              <a href="/user/login">{import.meta.env.VITE_REACT_APP_LOGIN}</a>
            </div>
          </div>

          <div className="button-error-message-container">
            <button type="submit" className="register-button">
              {import.meta.env.VITE_REACT_APP_REGISTER}
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
        </form>
      </div>
    </div>
  );
};

export default UserRegisterPage;
