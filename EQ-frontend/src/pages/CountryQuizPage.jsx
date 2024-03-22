import React from "react";
import { useParams } from "react-router-dom";

function CountryQuizPage() {
  const params = useParams(); // URL paraméterek lekérése
  const countryName = params.countryName; // Ország névének lekérése az URL-ből

  return (
    <div>
      <h1>{countryName}</h1>
    </div>
  );
}

export default CountryQuizPage;
