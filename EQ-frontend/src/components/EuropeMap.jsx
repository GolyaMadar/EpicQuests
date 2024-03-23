import { VectorMap } from "@react-jvectormap/core";
import { europeMill } from "@react-jvectormap/europe";
import "./EuropeMap.css";
import React from "react";

import { cities } from "../hooks/Countries";

function EuropeMap() {
  const handleRegionClick = (event, code) => {
    console.log(code);
    window.location.href = `/country:${code}`;
  };

  return (
    <>
      <div
        className="vector"
        style={{ margin: "auto", width: "750px", height: "580px" }}
      >
        <VectorMap
          map={europeMill}
          containerStyle={{
            width: "750px",
            height: "580px",
          }}
          backgroundColor="#0177e2"
          markers={cities}
          onRegionClick={handleRegionClick}
        />
      </div>
    </>
  );
}

export default EuropeMap;
