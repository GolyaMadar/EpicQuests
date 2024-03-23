import React, { useState, useEffect } from "react";
import EuropeMap from "../components/EuropeMap";
import "./CampaignPlayPage.css";

const questions = [
  {
    id: 1,
    question: "Mi a fővárosa Magyarországnak?",
    imageUri: "",
    explanation: "Budapest Magyarország fővárosa.",
    answers: [
      { id: 1, text: "Budapest" },
      { id: 2, text: "Berlin" },
      { id: 3, text: "Párizs" },
      { id: 4, text: "London" },
    ],
    correctAnswer: 1, // Az igaz válasz az answers tömbben lévő elem indexe
  },
  {
    id: 2,
    question: "Melyik évben tört ki az első világháború?",
    imageUri: "",
    explanation: "Az első világháború 1914-ben kezdődött.",
    answers: [
      { id: 1, text: "1918" },
      { id: 2, text: "1939" },
      { id: 3, text: "1914" },
      { id: 4, text: "1945" },
    ],
    correctAnswer: 3,
  },
];

const CampaignPlayPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [selectedCountryToDelete, setSelectedCountryToDelete] = useState(null);
  const [score, setScore] = useState(0);

  return (
    <>
      <div className="campaign-play-page">
        <div className="europe-map">
          <EuropeMap />
        </div>
        <div className="quiz-area">
          <div className="question">
            <h3>QUESTION</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default CampaignPlayPage;
