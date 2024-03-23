import { VectorMap } from "@react-jvectormap/core";
import { europeMill } from "@react-jvectormap/europe";
import React from "react";

import { cities } from "../hooks/Countries";

function EuropeMap() {
  const handleRegionClick = (event, code) => {
    console.log(code);
    window.location.href = `/country/:${code}`;
  };

  return (
    <>
      <div
        className="vector"
        style={{ margin: "auto", width: "900px", height: "800px" }}
      >
        <VectorMap
          map={europeMill}
          backgroundColor="#0177e2"
          markers={cities}
          onRegionClick={handleRegionClick}
        />
      </div>
    </>
  );
}

export default EuropeMap;
