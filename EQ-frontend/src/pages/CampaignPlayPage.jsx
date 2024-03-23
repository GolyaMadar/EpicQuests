import React, { useState, useEffect } from "react";
import EuropeMap from "../components/EuropeMap";
import "./CampaignPage.css";

const CampaignPage = () => {
  return (
    <>
      <div className="home-page">
        <div className="europe-map">
          <EuropeMap />
        </div>
      </div>
    </>
  );
};

export default CampaignPage;
