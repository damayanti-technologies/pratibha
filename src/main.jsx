import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { initializeStorage } from "./services/storage";

// Global CSS & Typography
import "./styles/global.css";
import "./styles/templates.css";

// Initialize IndexedDB with sample resume on first load
initializeStorage();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
