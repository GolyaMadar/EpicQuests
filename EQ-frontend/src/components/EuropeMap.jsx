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
  selectedCountries,
  setSelectedCountries,
  selectedCountries2,
  setSelectedCountries2,
}) {
  const handleRegionClick = (event, code) => {
    if (Object.keys(selectedCountries2).length == 0) {
      if (selectedCountry === code) {
        // Ha az ország már ki van választva, távolítsuk el
        setSelectedCountry(null);
        setSelectedToDelete(null);
      } else {
        // Kiválasztjuk az új országot
        setSelectedCountry(code);
        setSelectedToDelete(code);
        setSelectedCountries({ ...selectedCountries, [code]: 1 });
        for (const neighbour of neighbours[code]) {
          if (!selectedCountries.includes(neighbour)) {
            setSelectedCountries2((prevSelectedCountries2) => ({
              ...prevSelectedCountries2,
              [neighbour]: 1,
            }));
          }
        }
      }
    } else {
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
