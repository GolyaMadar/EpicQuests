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

function EuropeMap({
  setSelectedToDelete,
  selectedCountry,
  setSelectedCountry,
  selectedCountries2,
  setSelectedCountries2,
}) {
  const handleRegionClick = (event, code) => {
    // Ha az ország már ki van választva, távolítsuk el
    if (selectedCountry === code) {
      setSelectedCountry(null);
      setSelectedToDelete(null);
    } else {
      setSelectedCountry(code);
      setSelectedToDelete(code);
      // Szomszédos országok hozzáadása a selectedCountries2-höz
      for (const neighbour of neighbours[code]) {
        if (!selectedCountry || selectedCountry !== neighbour) {
          setSelectedCountries2((prevSelectedCountries2) => ({
            ...prevSelectedCountries2,
            [neighbour]: 1,
          }));
        }
      }
    }
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
                values: selectedCountry ? { [selectedCountry]: 1 } : {},
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
