// Importálni kell a Fragment komponenst, hogy a JSX-ben lehessen használni <>
import React, { useState, useEffect, Fragment } from "react";
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
    correctAnswer: 1,
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
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCountries2, setSelectedCountries2] = useState({});
  const [selectedCountryToDelete, setSelectedCountryToDelete] = useState(null);
  const [startQuiz, setStartQuiz] = useState(false);
  const [score, setScore] = useState(0);

  const handleCancelDelete = () => {
    setSelectedCountryToDelete(null);
    setSelectedCountry(null);
    setSelectedCountries2({});
  };

  const handleAnswerClick = (answerId) => {
    setSelectedAnswer(answerId);
  };

  const handleNextQuestion = () => {
    // Ellenőrizzük, hogy a válasz helyes-e, és növeljük a pontszámot, ha igen
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    // Frissítjük a következő kérdés indexét
    setCurrentQuestion(currentQuestion + 1);
    // Reseteljük a kiválasztott választ
    setSelectedAnswer("");
  };

  return (
    <div className="campaign-play-page">
      <div className="europe-map">
        <EuropeMap
          setSelectedToDelete={setSelectedCountryToDelete}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          selectedCountries2={selectedCountries2}
          setSelectedCountries2={setSelectedCountries2}
        />
      </div>
      <div className="quiz-area">
        <div className="question">
          <h3>QUESTION</h3>
          {selectedCountryToDelete && (
            <div className="question">
              <p>Would you like to continue with the selected country??</p>
              <div className="yes-no-button">
                <button
                  onClick={() => {
                    setSelectedCountryToDelete(null), setStartQuiz(true);
                  }}
                >
                  Yes
                </button>
                <button onClick={handleCancelDelete}>No</button>
              </div>
            </div>
          )}
          {startQuiz && (
            <div className="question">
              {/* Kérdés */}
              <h3>{questions[currentQuestion].question}</h3>
              {/* Kérdéshez kapcsolódó kép */}
              {questions[currentQuestion].imageUri ? (
                <img
                  src={questions[currentQuestion].imageUri}
                  alt="Question"
                  className="question-image"
                />
              ) : (
                <div className="no-image-placeholder">No Image</div>
              )}
              {/* Válaszok megjelenítése */}
              <div className="answers">
                {questions[currentQuestion].answers.map((answer) => (
                  <Fragment key={answer.id}>
                    <input
                      type="radio"
                      id={`answer-${answer.id}`}
                      name="answer"
                      value={answer.id}
                      checked={selectedAnswer === answer.id}
                      onChange={() => handleAnswerClick(answer.id)}
                    />
                    <label htmlFor={`answer-${answer.id}`}>{answer.text}</label>
                  </Fragment>
                ))}
              </div>
              {/* Következő gomb */}
              <button onClick={handleNextQuestion}>Next</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignPlayPage;
