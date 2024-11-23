import React from "react";
import "./loader.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p className="loader-text">Loading...</p>
    </div>
  );
};

export default Loader;
