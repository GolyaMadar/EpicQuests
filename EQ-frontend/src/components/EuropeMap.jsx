import { VectorMap } from "@react-jvectormap/core";
import { europeMill } from "@react-jvectormap/europe";
import React from "react";

function EuropeMap(isLoggedIn) {
  const handleRegionClick = (event, code) => {
    if (isLoggedIn) {
      console.log(code);
      window.location.href = `/country:${code}`;
    }
    // console.log(isLoggedIn);
  };

  return (
    <>
      <div
        className="vector"
        style={{ margin: "auto", width: "900px", height: "800px" }}
      >
        <VectorMap
          map={europeMill}
          backgroundColor="blue"
          onRegionClick={handleRegionClick}
        />
      </div>
    </>
  );
}

export default EuropeMap;
