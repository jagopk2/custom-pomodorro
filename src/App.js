import "./App.css";
import MainTask from "./components/MainTask";
import { useMemo, useRef, useEffect } from "react";
import { PomodoroProvider } from "./context/PomodoroContext";
import SaveButton from "./components/SaveButton";
import React from "react";
const getQuote = require("randoquoter");

export const timerContext = React.createContext();

const defaultTimerValue = {
  study: 1500,
  short: 300,
  long: 900,
  revise: 301,
  bell: true,
  notification: true,
  whiteNoise: true,
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
