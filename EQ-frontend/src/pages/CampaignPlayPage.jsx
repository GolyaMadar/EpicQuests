import React, { useState, useEffect } from "react";
import EuropeMap from "../components/EuropeMap";
import "./CampaignPlayPage.css";

const CampaignPlayPage = () => {
  return (
    <>
      <div className="campaign-play-page">
        <div className="europe-map">
          <EuropeMap />
        </div>
        <div className="quiz-area">asd</div>
      </div>
    </>
  );
};

export default CampaignPlayPage;
