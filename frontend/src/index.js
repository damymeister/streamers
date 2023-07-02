import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { StyleSheetManager } from 'styled-components';
import "./styles/css/home.css";
import "./styles/css/form.css";
createRoot(document.getElementById("root")).render(
    <StyleSheetManager>
      <App />
    </StyleSheetManager>
  );