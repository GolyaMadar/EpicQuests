import React, { useState } from "react";
import "./LoginRegisterTooltip.css";

const LoginRegisterTooltip = ({ children, tooltipText, regexDetails }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setIsTooltipVisible(false);
  };

  return (
    <div
      className="tooltip-container-login-register"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isTooltipVisible && (
        <div className="tooltip-login-register">
          <p>{tooltipText}</p>
          {regexDetails && (
            <ul>
              {regexDetails.map((detail, index) => (
                <li key={index} className="regex-detail-login-register">
                  {detail.isValid ? (
                    <span className="valid-login-register">&#x2713;</span>
                  ) : (
                    <span className="invalid-login-register">&#x2717;</span>
                  )}
                  {detail.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default LoginRegisterTooltip;
