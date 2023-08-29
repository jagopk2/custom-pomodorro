import "./App.css";
import MainTask from "./components/MainTask";
import { useMemo, useRef, useEffect } from "react";
import { PomodoroProvider } from "./context/PomodoroContext";
import SaveButton from "./components/SaveButton";
import React from "react";
import { Container, IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from 'react-router-dom';
const getQuote = require("randoquoter");

export const timerContext = React.createContext();

export const defaultTimerValue = {
  study: 1500,
  short: 300,
  long: 900,
  revise: 301,
  bell: true,
  notification: true,
  whiteNoise: true,
  whiteNoiseRevision: true,
  motivation: true,
  quotes: true,
};

const App = () => {
  const gridRef = useRef(null);

  const themes = useMemo(
    () => ({
      pomodoro: {
        foreground: "#ffffff",
        background: "#d95550",
      },
      short_break: {
        foreground: "#ffffff",
        background: "#019b3c",
      },
      long_break: {
        foreground: "#ffffff",
        background: "#ab47bc",
      },
      completed: {
        foreground: "#ffffff",
        background: "#4caf50",
      },
      revision: {
        foreground: "#ffffff",
        background: "#b25701",
      },
    }),
    []
  );

  // Check local storage for saved timer values
  const savedTimerValues = JSON.parse(localStorage.getItem("timerValues"));

  // Use saved timer values if present, otherwise use defaultTimerValue
  const initialTimerValue = savedTimerValues || defaultTimerValue;

  // Set initial timer values in local storage if not present
  useEffect(() => {
    if (!savedTimerValues) {
      localStorage.setItem("timerValues", JSON.stringify(defaultTimerValue));
    }
  }, []);

  const quote = getQuote.getRandomQuote();

  return (
    <>
      <timerContext.Provider value={initialTimerValue}>
        <IconButton
          edge="start"
          color="primary"
          aria-label="settings"
          component={Link}
          to="/settings"
          style={{ position: "absolute", top: 30, left: 30 }}
        >
          <SettingsIcon />
        </IconButton>
        <PomodoroProvider>
          <MainTask themes={themes} />
        </PomodoroProvider>
        <div className="quote-container">
          <div className="quote">
            <p>
              <q>{quote.text}</q>
            </p>
            <div className="author">{quote.author}</div>
          </div>
        </div>
      </timerContext.Provider>
    </>
  );
};

export default App;
