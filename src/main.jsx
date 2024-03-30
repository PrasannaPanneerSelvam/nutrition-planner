import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { NutritionContextProvider } from "./context/Nutrition";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <NutritionContextProvider>
      <App />
    </NutritionContextProvider>
  </React.StrictMode>
);
