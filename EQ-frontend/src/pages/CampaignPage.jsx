import React, { useState, useEffect } from "react";
import UseAuth from "../hooks/UseAuth";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { IoIosAddCircleOutline } from "react-icons/io";
import "./CampaignPage.css";

import { campaignTypes } from "../hooks/Countries";

const animatedComponents = makeAnimated();

const dataCampaign = [
  {
    type: "Children",
    image: "./images/dummy_card.png",
    id: 1,
    creationDate: "2024-02-02",
    score: 12,
    percent: 23,
  },
  {
    type: "General education",
    image: "./images/dummy_card.png",
    id: 2,
    creationDate: "2024-03-15",
    score: 8,
    percent: 45,
  },
  {
    type: "Social sensitivity",
    image: "./images/dummy_card.png",
    id: 3,
    creationDate: "2024-01-10",
    score: 15,
    percent: 60,
  },
];

const CampaignTypesSelect = ({ data, setData }) => {
  const handleChange = (selectedOptions) => {
    setData(selectedOptions);
  };

  const options = data.map((campaignType) => ({
    label: campaignType.label,
    value: campaignType.value,
  }));

  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      defaultValue={options[0]}
      options={options}
      onChange={handleChange}
    />
  );
};

const CampaignCardItem = ({
  type,
  id,
  image,
  creationDate,
  score,
  percent,
}) => {
  const handleNavigation = (event) => {
    window.location.href = `/campaign/:${id}/play`;
  };

  return (
    <div className="campaign-card" onClick={handleNavigation}>
      <h2 className="campaign-card-title">{type}</h2>
      <div className="campaign-card-image">
        <img src={image} alt={type} />
      </div>
      <div className="campaign-card-content">
        <div className="campaign-card-details">
          <p className="creation-date">
            <b>Creation Date:</b> {creationDate}
          </p>
          <div className="progress-bar">
            <p className="score">
              <b>Score:</b> {score}
            </p>
            <p className="percent">
              <b>{percent}%</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CampaignPage = () => {
  const [selectedCampaignType, setSelectedCampaignType] = useState(
    campaignTypes[0]
  );
  const [yourCampaigns, setYourCampaigns] = useState([]);

  const { isLoggedIn, token } = UseAuth();

  const handleAddCampaign = () => {
    // Új kampány létrehozása a kiválasztott típussal
    const newCampaign = {
      type: selectedCampaignType.label,
      id: Math.floor(Math.random() * 1000), // Véletlenszerű azonosító generálása
      image: "./images/dummy_card.png",
      creationDate: new Date().toISOString().split("T")[0], // Aktuális dátum beállítása
      score: 0, // Alapértelmezett pontszám
      percent: 0, // Alapértelmezett százalék
    };

    // Hozzáadni az új kampányt a listához
    setYourCampaigns([...yourCampaigns, newCampaign]);
  };

  return (
    <div className="campaign-page">
      <div className="campaign-title">
        <h3>Campaign</h3>
      </div>
      <div className="div-nw">
        <CampaignTypesSelect
          data={campaignTypes}
          setData={setSelectedCampaignType}
        />
        <button className="new-campaign" onClick={handleAddCampaign}>
          <IoIosAddCircleOutline />
          <p className="add-campaign">Add new campaign</p>
        </button>
      </div>

      <div className="your-campaigns">
        <h2>Your campaigns</h2>
      </div>
      <div className="campaing-list">
        {yourCampaigns.map((campaign, index) => (
          <CampaignCardItem
            key={index}
            type={campaign.type}
            image={campaign.image}
            id={campaign.id}
            creationDate={campaign.creationDate}
            score={campaign.score}
            percent={campaign.percent}
          />
        ))}
      </div>
    </div>
  );
};

export default CampaignPage;
