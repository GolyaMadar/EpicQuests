import React, { useState } from "react";
import { VectorMap } from "@react-jvectormap/core";
import { europeMill } from "@react-jvectormap/europe";
import "./EuropeMap.css";
import {
  selectedColor,
  neighbourColor,
  cities,
  neighbours,
} from "../hooks/Countries";

const initialSelectedCountries = {};
const initialSelectedCountries2 = {};

function EuropeMap({ selectedCountryToDelete, setSelectedCountryToDelete }) {
  const [selectedCountries, setSelectedCountries] = useState(
    initialSelectedCountries
  );
  const [selectedCountries2, setSelectedCountries2] = useState(
    initialSelectedCountries2
  );

  const handleRegionClick = (event, code) => {
    setSelectedCountries((prevSelectedCountries) => {
      const updatedSelectedCountries = { ...prevSelectedCountries };

      // Ha az ország már ki van választva, távolítsuk el
      if (updatedSelectedCountries[code] === 1) {
        setSelectedCountryToDelete(code);
      } else {
        updatedSelectedCountries[code] = 1;
        // Szomszédos országok hozzáadása a selectedCountries2-höz
        for (const neighbour of neighbours[code]) {
          if (!selectedCountries[neighbour]) {
            setSelectedCountries2((prevSelectedCountries2) => ({
              ...prevSelectedCountries2,
              [neighbour]: 1,
            }));
          }
        }
      }
      return updatedSelectedCountries;
    });
  };

  return (
    <>
      <div
        className="vector"
        style={{ margin: "auto", width: "700px", height: "550px" }}
      >
        <VectorMap
          map={europeMill}
          containerStyle={{
            width: "700px",
            height: "590px",
          }}
          backgroundColor="#0177e2"
          markers={cities}
          series={{
            regions: [
              {
                scale: selectedColor,
                values: selectedCountries,
                min: 0,
                max: 1,
              },
              {
                scale: neighbourColor,
                values: selectedCountries2,
                min: 0,
                max: 100,
              },
            ],
          }}
          onRegionClick={handleRegionClick}
        />
      </div>
    </>
  );
}

export default EuropeMap;
