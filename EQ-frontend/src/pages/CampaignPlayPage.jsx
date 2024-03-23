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
      { id: 1, text: "Budzxczxcasdasdzxczxczxczxczxczxczxczxczxczxcapest" },
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
  {
    id: 3,
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
  {
    id: 4,
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
  const [selectedAnswers, setSelectedAnswers] = useState([]);
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
    // Ellenőrizzük, hogy a válasz már kiválasztva van-e
    const isSelected = selectedAnswers.includes(answerId);
    if (isSelected) {
      // Ha a válasz már kiválasztva van, akkor eltávolítjuk azt
      setSelectedAnswers(selectedAnswers.filter((id) => id !== answerId));
    } else {
      // Ha a válasz még nincs kiválasztva, akkor hozzáadjuk azt
      setSelectedAnswers([...selectedAnswers, answerId]);
    }
  };

  const handleNextQuestion = () => {
    // Ellenőrizzük, hogy még vannak-e további kérdések
    if (currentQuestion < questions.length - 1) {
      // Ellenőrizzük, hogy a válaszok helyesek-e
      console.log(selectedAnswers);
      const currentQuestionData = questions[currentQuestion];
      const isCorrect = selectedAnswers.every((id) =>
        currentQuestionData.answers.find((answer) => answer.id === id)
      );

      // Ha a válaszok helyesek, növeljük a pontszámot
      if (isCorrect) {
        // A pontszám növeléséhez itt írd meg a szükséges kódot
      }

      // Frissítjük a következő kérdés indexét
      setCurrentQuestion(currentQuestion + 1);
      // Reseteljük a kiválasztott válaszokat
      setSelectedAnswers([]);
    } else {
      // Ha elfogytak a kérdések, kezeld ezt a helyzetet itt, például állítsd le a kvízt, jeleníts meg egy üzenetet stb.
      // Itt megjeleníthetsz egy üzenetet vagy irányíthatod át a felhasználót egy másik oldalra
      console.log("Elfogytak a kérdések!");
      // Például:
      alert("Gratulálok, befejezted a kvízt!");
      // Vagy:
      // history.push("/quiz-finished"); // Irányítás egy másik oldalra
    }
  };

  return (
    <div className="campaign-play-page">
      <div className={`europe-map ${startQuiz ? "no-pointer-events" : ""}`}>
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
              <h3>{questions[currentQuestion].question}</h3>
              {/* Kérdéshez kapcsolódó kép */}
              {questions[currentQuestion].imageUri ? (
                <div className="image-content">
                  <img
                    src={questions[currentQuestion].imageUri}
                    alt="Question"
                    className="question-image"
                  />
                </div>
              ) : (
                <div className="no-image-placeholder">
                  No Image
                  <div className="image-content">
                    <img src="/images/dummy_card.png" alt="" />
                  </div>
                </div>
              )}
              {/* Válaszok megjelenítése */}
              <div className="answers">
                <div className="a1">
                  <div className="answer">
                    {questions[currentQuestion].answers
                      .slice(0, 1)
                      .map((answer) => (
                        <div
                          key={answer.id}
                          className={
                            selectedAnswers.includes(answer.id)
                              ? "answer selected"
                              : "answer"
                          }
                          onClick={() => handleAnswerClick(answer.id)}
                        >
                          <label htmlFor={`answer-${answer.id}`}>
                            {answer.text}
                          </label>
                        </div>
                      ))}
                  </div>
                  <div className="answer">
                    {questions[currentQuestion].answers
                      .slice(1, 2)
                      .map((answer) => (
                        <div
                          key={answer.id}
                          className={
                            selectedAnswers.includes(answer.id)
                              ? "answer selected"
                              : "answer"
                          }
                          onClick={() => handleAnswerClick(answer.id)}
                        >
                          <label htmlFor={`answer-${answer.id}`}>
                            {answer.text}
                          </label>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="a2">
                  <div className="answer">
                    {questions[currentQuestion].answers
                      .slice(2, 3)
                      .map((answer) => (
                        <div
                          key={answer.id}
                          className={
                            selectedAnswers.includes(answer.id)
                              ? "answer selected"
                              : "answer"
                          }
                          onClick={() => handleAnswerClick(answer.id)}
                        >
                          <label htmlFor={`answer-${answer.id}`}>
                            {answer.text}
                          </label>
                        </div>
                      ))}
                  </div>
                  <div className="answer">
                    {questions[currentQuestion].answers
                      .slice(3, 4)
                      .map((answer) => (
                        <div
                          key={answer.id}
                          className={
                            selectedAnswers.includes(answer.id)
                              ? "answer selected"
                              : "answer"
                          }
                          onClick={() => handleAnswerClick(answer.id)}
                        >
                          <label htmlFor={`answer-${answer.id}`}>
                            {answer.text}
                          </label>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <button onClick={handleNextQuestion}>Next</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignPlayPage;
