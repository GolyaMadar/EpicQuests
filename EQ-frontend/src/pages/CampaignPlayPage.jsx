// Importálni kell a Fragment komponenst, hogy a JSX-ben lehessen használni <>
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EuropeMap from "../components/EuropeMap";
import UseAuth from "../hooks/UseAuth";
import { ToastContainer, toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";
import "react-toastify/dist/ReactToastify.css";
import "./CampaignPlayPage.css";

// const questions = [
//   {
//     campaignId: 2,
//     countryCode: "RO",
//     destinations: [
//       {
//         id: 1,
//         name: "Marosvásárhely",
//         latitude: 46.54245,
//         longitude: 24.55747,
//         quizzes: [
//           {
//             id: 1,
//             question: "When was János Bolyai born?",
//             imageUri: "",
//             explanation:
//               "The famous mathematician from Marosvásárhely was born in 18021",
//             category: 1,
//             answers: [
//               {
//                 answerId: 1,
//                 text: "1915",
//                 value: -10,
//                 hasSelected: false,
//               },
//               {
//                 answerId: 2,
//                 text: "1802",
//                 value: 10,
//                 hasSelected: false,
//               },
//               {
//                 answerId: 3,
//                 text: "1777",
//                 value: -10,
//                 hasSelected: false,
//               },
//               {
//                 answerId: 4,
//                 text: "1848",
//                 value: -10,
//                 hasSelected: false,
//               },
//             ],
//           },
//           {
//             id: 2,
//             question: "asd as das d asd?",
//             imageUri: "",
//             explanation: "asdasd sa dasd as das",
//             category: 1,
//             answers: [
//               {
//                 answerId: 1,
//                 text: "1asdasdasd915",
//                 value: -10,
//                 hasSelected: false,
//               },
//               {
//                 answerId: 2,
//                 text: "asdasdasd",
//                 value: 10,
//                 hasSelected: false,
//               },
//               {
//                 answerId: 3,
//                 text: "1777",
//                 value: 10,
//                 hasSelected: false,
//               },
//               {
//                 answerId: 4,
//                 text: "18asdasdas48",
//                 value: -10,
//                 hasSelected: false,
//               },
//             ],
//           },
//           {
//             id: 3,
//             question: "Whenasdasdasdas adas ds s born?",
//             imageUri: "",
//             explanation: "Thasdasdasdasdrn in 18021",
//             category: 1,
//             answers: [
//               {
//                 answerId: 1,
//                 text: "asdasdasdasdas",
//                 value: -10,
//                 hasSelected: false,
//               },
//               {
//                 answerId: 2,
//                 text: "18asdasdsadasd02",
//                 value: 10,
//                 hasSelected: false,
//               },
//               {
//                 answerId: 3,
//                 text: "asdasdasd",
//                 value: -10,
//                 hasSelected: false,
//               },
//               {
//                 answerId: 4,
//                 text: "asdasdasd",
//                 value: 10,
//                 hasSelected: false,
//               },
//             ],
//           },
//           {
//             id: 4,
//             question: "When was János Bolyai born?",
//             imageUri: "",
//             explanation: "The famouasdasdas as sa sd sd  in 18021",
//             category: 1,
//             answers: [
//               {
//                 answerId: 1,
//                 text: "1915",
//                 value: -10,
//                 hasSelected: false,
//               },
//               {
//                 answerId: 2,
//                 text: "1802",
//                 value: 10,
//                 hasSelected: false,
//               },
//               {
//                 answerId: 3,
//                 text: "1777",
//                 value: -10,
//                 hasSelected: false,
//               },
//               {
//                 answerId: 4,
//                 text: "18sd sd sd sd sdsdds48",
//                 value: -10,
//                 hasSelected: false,
//               },
//             ],
//           },
//           {
//             id: 5,
//             question: "When was János Bolyai born?",
//             imageUri: "",
//             explanation:
//               "The famous mathematician from Marosvásárhely was born in 18021",
//             category: 1,
//             answers: [
//               {
//                 answerId: 1,
//                 text: "1915",
//                 value: -10,
//                 hasSelected: false,
//               },
//               {
//                 answerId: 2,
//                 text: "1802",
//                 value: 10,
//                 hasSelected: false,
//               },
//               {
//                 answerId: 3,
//                 text: "1777",
//                 value: -10,
//                 hasSelected: false,
//               },
//               {
//                 answerId: 4,
//                 text: "1848",
//                 value: -10,
//                 hasSelected: false,
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
// ];

const CampaignPlayPage = () => {
  const { token } = UseAuth();
  const { campaign_id } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedCountries2, setSelectedCountries2] = useState([]);
  const [selectedCountryToDelete, setSelectedCountryToDelete] = useState(null);
  const [startQuiz, setStartQuiz] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleCancelDelete = () => {
    setSelectedCountryToDelete(null);
    setSelectedCountry(null);
    setSelectedCountries2([]);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (selectedCountry && campaign_id) {
        const [prefix, id] = campaign_id.split(":");
        console.log(
          `${
            import.meta.env.VITE_REACT_USER_API_URL
          }/api/campaigns/${id}/countries/${selectedCountry}`
        );
        try {
          const response = await fetch(
            `${
              import.meta.env.VITE_REACT_USER_API_URL
            }/api/campaigns/${id}/countries/${selectedCountry}`,
            {
              method: "GET",
              headers: {
                accept: "text/plain",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await response.json();
          console.log(data);
          setQuestions(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    if (!startQuiz) fetchData();
  }, [selectedCountry, campaign_id, token, startQuiz]);

  useEffect(() => {
    setAllQuizzes(questions);

    setLoading(false);
  }, [questions]);

  const handleAnswerClick = (answer) => {
    // Ellenőrizzük, hogy a válasz már kiválasztva van-e
    const isSelected = selectedAnswers.includes(answer.answerId);
    answer.hasSelected = !answer.hasSelected;
    if (isSelected) {
      // Ha a válasz már kiválasztva van, akkor eltávolítjuk azt
      setSelectedAnswers(
        selectedAnswers.filter((id) => id !== answer.answerId)
      );
    } else {
      // Ha a válasz még nincs kiválasztva, akkor hozzáadjuk azt
      setSelectedAnswers([...selectedAnswers, answer.answerId]);
    }
  };

  const sendAnswers = async () => {
    const apiUrl = `${import.meta.env.VITE_REACT_USER_API_URL}/api/campaigns/${
      questions[0].campaignId
    }/${allQuizzes[currentQuestion].id}`;
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          accept: "text/plain",
          "Content-Type": "application/json", // Helyes Content-Type beállítás
          Authorization: `Bearer ${token}`, // Ellenőrizd a token értékét
        },
        body: JSON.stringify({
          answers: selectedAnswers,
        }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleNextQuestion = () => {
    // Ellenőrizzük, hogy még vannak-e további kérdések
    if (currentQuestion < allQuizzes.length - 1) {
      // Ellenőrizzük, hogy a válaszok helyesek-e
      const currentQuestionData = allQuizzes[currentQuestion];
      if (currentQuestionData && selectedAnswers.length === 0) {
        alert("Answer recommended");
      } else {
        notify(<>{currentQuestionData.explanation}</>, "info");
        setTimeout(() => {
          setCurrentQuestion(currentQuestion + 1);
          // Reseteljük a kiválasztott válaszokat
          setSelectedAnswers([]);
          sendAnswers();
        }, 3000);
        // Frissítjük a következő kérdés indexét
      }
    } else {
      setStartQuiz(false);
      alert("Quiz over!");
    }
  };

  const notify = (message, type = "info") => {
    toast[type](message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      newestOnTop: false,
      closeOnClick: true,
      rtl: false,
      pauseOnFocusLoss: true,
      draggable: true,
      pauseOnHover: true,
      theme: "dark",
    });
  };

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="campaign-play-page">
          <div className={`europe-map ${startQuiz ? "no-pointer-events" : ""}`}>
            <EuropeMap
              setSelectedToDelete={setSelectedCountryToDelete}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              selectedCountries={selectedCountries}
              setSelectedCountries={setSelectedCountries}
              selectedCountries2={selectedCountries2}
              setSelectedCountries2={setSelectedCountries2}
            />
          </div>
          <div className="quiz-area">
            <div className="toast" id="toasttoast">
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
              />
            </div>
            <div className="question">
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
              {startQuiz ? (
                <>
                  <div className="question">
                    <h3>{allQuizzes[currentQuestion].question}</h3>
                    {/* Kérdéshez kapcsolódó kép */}
                    {allQuizzes[currentQuestion].imageUri ? (
                      <div className="image-content">
                        <img
                          src={allQuizzes[currentQuestion].imageUri}
                          alt="Question"
                          className="question-image"
                        />
                      </div>
                    ) : (
                      <div className="no-image-placeholder">
                        <div className="image-content">
                          <img src="/images/dummy_card.png" alt="" />
                        </div>
                      </div>
                    )}
                    {/* Válaszok megjelenítése */}
                    <div className="answers">
                      <div className="a1">
                        <div className="answer">
                          <div
                            key={
                              allQuizzes[currentQuestion].answers[0].answerId
                            }
                            className={
                              selectedAnswers.includes(
                                allQuizzes[currentQuestion].answers[0].answerId
                              )
                                ? "answer selected"
                                : "answer"
                            }
                            onClick={() =>
                              handleAnswerClick(
                                allQuizzes[currentQuestion].answers[0]
                              )
                            }
                          >
                            <label
                              htmlFor={`answer-${allQuizzes[currentQuestion].answers[0].answerId}`}
                            >
                              {allQuizzes[currentQuestion].answers[0].text}
                            </label>
                          </div>
                        </div>
                        <div className="answer">
                          <div
                            key={
                              allQuizzes[currentQuestion].answers[1].answerId
                            }
                            className={
                              selectedAnswers.includes(
                                allQuizzes[currentQuestion].answers[1].answerId
                              )
                                ? "answer selected"
                                : "answer"
                            }
                            onClick={() =>
                              handleAnswerClick(
                                allQuizzes[currentQuestion].answers[1]
                              )
                            }
                          >
                            <label
                              htmlFor={`answer-${allQuizzes[currentQuestion].answers[1].answerId}`}
                            >
                              {allQuizzes[currentQuestion].answers[1].text}
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="a2">
                        <div className="answer">
                          <div
                            key={
                              allQuizzes[currentQuestion].answers[2].answerId
                            }
                            className={
                              selectedAnswers.includes(
                                allQuizzes[currentQuestion].answers[2].answerId
                              )
                                ? "answer selected"
                                : "answer"
                            }
                            onClick={() =>
                              handleAnswerClick(
                                allQuizzes[currentQuestion].answers[2]
                              )
                            }
                          >
                            <label
                              htmlFor={`answer-${allQuizzes[currentQuestion].answers[2].answerId}`}
                            >
                              {allQuizzes[currentQuestion].answers[2].text}
                            </label>
                          </div>
                        </div>
                        <div className="answer">
                          <div
                            key={
                              allQuizzes[currentQuestion].answers[3].answerId
                            }
                            className={
                              selectedAnswers.includes(
                                allQuizzes[currentQuestion].answers[3].answerId
                              )
                                ? "answer selected"
                                : "answer"
                            }
                            onClick={() =>
                              handleAnswerClick(
                                allQuizzes[currentQuestion].answers[3]
                              )
                            }
                          >
                            <label
                              htmlFor={`answer-${allQuizzes[currentQuestion].answers[3].answerId}`}
                            >
                              {allQuizzes[currentQuestion].answers[3].text}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button onClick={handleNextQuestion}>Next</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="welcome">
                    Choose a Country to Discover Unique Insights About It!
                    Unlock a World of Information with Just One Click!
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CampaignPlayPage;
