import React, { useState, useEffect, useRef } from "react";
import "./DrawPage.css";

const Menu = ({ setLineColor, setLineWidth, setLineOpacity }) => {
  return (
    <div className="Menu">
      <label>Brush Color </label>
      <input
        type="color"
        onChange={(e) => {
          setLineColor(e.target.value);
        }}
      />
      <label>Brush Width </label>
      <input
        type="range"
        min="15"
        max="80"
        onChange={(e) => {
          setLineWidth(e.target.value);
        }}
      />
      <label>Brush Opacity</label>
      <input
        type="range"
        min="15"
        max="100"
        onChange={(e) => {
          setLineOpacity(e.target.value / 100);
        }}
      />
    </div>
  );
};

const Canvas = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState(15);
  const [lineColor, setLineColor] = useState("black");
  const [lineOpacity, setLineOpacity] = useState(0.1);

  // Initialization when the component
  // mounts for the first time
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.globalAlpha = lineOpacity;
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctxRef.current = ctx;
  }, [lineColor, lineOpacity, lineWidth]);

  // Function for starting the drawing
  const startDrawing = (e) => {
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  // Function for ending the drawing
  const endDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = (e) => {
    if (!isDrawing) {
      return;
    }
    ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);

    ctxRef.current.stroke();
  };

  const uploadImage = async (file) => {
    // FormData létrehozása és a fájl hozzáadása
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(
      "http://fokakefir.go.ro:2000/upload_and_generate/",
      {
        method: "POST",
        body: formData, // FormData objektum küldése a törzsben
      }
    );

    const data = await response.json();
    console.log(response);

    if (response.status == 200) {
      console.log("Server response:", data.filename);
    } else {
      console.error("Error uploading image:", response.statusText);
    }
  };

  // SaveImage függvény módosítása az uploadImage hívására
  const saveImage = async () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL("image/jpeg"); // Kép adat URL létrehozása

    // Adat URL-ből Blob objektum létrehozása
    const blob = await (await fetch(image)).blob();

    // Fájl elküldése
    uploadImage(blob);
    clearCanvas();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
  return (
    <div className="draw-area">
      <Menu
        setLineColor={setLineColor}
        setLineWidth={setLineWidth}
        setLineOpacity={setLineOpacity}
      />
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseMove={draw}
        ref={canvasRef}
        width={`600px`}
        height={`600px`}
      />
      <div className="save-canvas">
        <button onClick={saveImage}>Mentés képként</button>
      </div>
    </div>
  );
};

const DrawPage = () => {
  return (
    <div className="draw-page">
      <div className="paint-content">
        <Canvas />
      </div>
    </div>
  );
};

export default DrawPage;
