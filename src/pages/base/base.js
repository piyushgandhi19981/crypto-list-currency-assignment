import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CryptoList from '../cryptoList';
import CryptoDetailsPage from "../cryptoDetails";

function BaseApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CryptoList />} />
        <Route path="/crypto-details/:id" element={<CryptoDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default BaseApp;
