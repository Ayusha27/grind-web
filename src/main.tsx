import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";

import App from "./App";
import { theme } from "./theme/theme";
import { initializeToken } from "./utils/auth";
// Imported early so the PWA install prompt is captured before any page mounts.
import "./hooks/useInstallPrompt";

import "./index.css";
initializeToken();

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
  // </React.StrictMode>
);