import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="sb__footer section__padding">
        <div className="sb__footer-links">
          <div className="sb__footer-links_div">
            <h4>{import.meta.env.VITE_REACT_APP_FOOTER_FOR_BUSINESS}</h4>
            <a href="/employeer">
              <p>{import.meta.env.VITE_REACT_APP_FOOTER_EMPLOYEER}</p>
            </a>
            <a href="/healthplan">
              <p>{import.meta.env.VITE_REACT_APP_FOOTER_HEALTH_PLAN}</p>
            </a>
            <a href="/individual">
              <p>{import.meta.env.VITE_REACT_APP_FOOTER_INDIVIDUAL}</p>
            </a>
          </div>

          <div className="sb__footer-links_div">
            <h4>{import.meta.env.VITE_REACT_APP_FOOTER_RESOURCES}</h4>
            <a href="/resource">
              <p>{import.meta.env.VITE_REACT_APP_FOOTER_RESOURCES_CENTER}</p>
            </a>
            <a href="/healthplan">
              <p>{import.meta.env.VITE_REACT_APP_FOOTER_TESTIMONIALS}</p>
            </a>
            <a href="/individual">
              <p>{import.meta.env.VITE_REACT_APP_FOOTER_STV}</p>
            </a>
          </div>
          <div className="sb__footer-links_div">
            <h4>{import.meta.env.VITE_REACT_APP_FOOTER_PARTNERS}</h4>
            <p>{import.meta.env.VITE_REACT_APP_FOOTER_HAWAII}</p>
          </div>
          <div className="sb__footer-links_div">
            <h4>{import.meta.env.VITE_REACT_APP_FOOTER_COMPANY}</h4>
            <a href="/about">
              <p>{import.meta.env.VITE_REACT_APP_FOOTER_ABOUT}</p>
            </a>
            <a href="/press">
              <p>{import.meta.env.VITE_REACT_APP_FOOTER_PRESS}</p>
            </a>
            <a href="/career">
              <p>{import.meta.env.VITE_REACT_APP_FOOTER_CAREER}</p>
            </a>
            <a href="contact">
              <p>{import.meta.env.VITE_REACT_APP_FOOTER_CONTACTS}</p>
            </a>
          </div>
          <div className="sb__footer-links_div">
            <h4>{import.meta.env.VITE_REACT_APP_FOOTER_COMING_SOON}</h4>
            <div className="socialmedia">
              <p>
                <FontAwesomeIcon icon={faFacebook} />
              </p>
              <p>
                <FontAwesomeIcon icon={faTwitter} />
              </p>
              <p>
                <FontAwesomeIcon icon={faLinkedin} />
              </p>
              <p>
                <FontAwesomeIcon icon={faInstagram} />
              </p>
            </div>
          </div>
        </div>
        <hr></hr>
        <div className="sb__footer-below">
          <div className="sb__footer-copyright">
            <p>
              @{new Date().getFullYear()}{" "}
              {import.meta.env.VITE_REACT_APP_FOOTER_COPYRIGHT}
            </p>
          </div>
          <div className="sb__footer-below-links">
            <a href="/terms">
              <div>
                <p>{import.meta.env.VITE_REACT_APP_FOOTER_TERMS_CONDITIONS}</p>
              </div>
            </a>
            <a href="/privacy">
              <div>
                <p>{import.meta.env.VITE_REACT_APP_FOOTER_PRIVACY}</p>
              </div>
            </a>
            <a href="/security">
              <div>
                <p>{import.meta.env.VITE_REACT_APP_FOOTER_SECURITY}</p>
              </div>
            </a>
            <a href="/cookie">
              <div>
                <p>{import.meta.env.VITE_REACT_APP_FOOTER_COOKIE}</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
