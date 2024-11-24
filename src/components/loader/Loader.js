import React from "react";
import "./loader.css";

const Loader = () => {
  return (
    <div role="region" className="loader-container" aria-label="Loader container">
      <div className="loader" role="status" aria-label="Loading animation">
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
