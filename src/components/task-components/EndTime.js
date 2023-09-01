import { Button } from "@mui/material";
import { memo, useContext, useEffect, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import { serialiseDate } from "../../utils/date";
import { PomodoroContext } from "../../context/PomodoroContext";
import { timerContext } from "../../App";
import motivation1 from "../../images/motivation1.mp3";
import wn from "../../images/wn.mp3";

const EndTime = memo((props) => {
  const {
    pomodoroType,
    buttonColor,
    timerStarted,
    setTimerStarted,
    id,
    timeLeft,
    seconds,
  } = props;
  const { dispatch } = useContext(PomodoroContext);
  const {
    short,
    long,
    study,
    revise,
    whiteNoise,
    motivation,
    whiteNoiseRevision,
    whiteNoiseVolume, // Add white noise volume setting
    motivationVolume, // Add motivation music volume setting
    whiteNoiseRevisionVolume, // Add white noise revision volume setting
  } = useContext(timerContext);
  const [audio, setAudio] = useState(null);

  const endTime = new Date();
  let endTimeDelta;

  useEffect(() => {
    setTimerStarted(false);
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [pomodoroType]);

  if (pomodoroType === "pomodoro") {
    endTimeDelta = timeLeft ? timeLeft : study;
  } else if (pomodoroType === "short_break") {
    endTimeDelta = short;
  } else if (pomodoroType === "long_break") {
    endTimeDelta = long;
  } else if (pomodoroType === "revision") {
    endTimeDelta = revise;
  }

  endTime.setMinutes(endTime.getMinutes() + Math.round(endTimeDelta / 60));
  const endTimeString = serialiseDate(endTime);

  const onClickHandler = () => {
    // Stop any previously playing audio
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    if (!timerStarted) {
      // Play the appropriate sound based on the timer type and user settings
      if (pomodoroType === "pomodoro" && whiteNoise) {
        const newAudio = new Audio(wn);
        newAudio.volume = whiteNoiseVolume / 100; // Set volume based on user settings
        setAudio(newAudio);
        newAudio.play();
      } else if (pomodoroType === "short_break" && motivation) {
        const newAudio = new Audio(motivation1);
        newAudio.volume = motivationVolume / 100; // Set volume based on user settings
        setAudio(newAudio);
        newAudio.play();
      } else if (pomodoroType === "revision" && whiteNoiseRevision) {
        const newAudio = new Audio(wn);
        newAudio.volume = whiteNoiseRevisionVolume / 100; // Set volume based on user settings
        setAudio(newAudio);
        newAudio.play();
      }
    } else if (audio) {
      audio.pause();
    }

    if (id !== -1) {
      timerStarted
        ? dispatch({ type: "stopped_timer", id, timeLeft: seconds })
        : dispatch({ type: "started_timer", id });
    }
    setTimerStarted(!timerStarted);
  };

  return (
    <div className="end-timer-container">
      <Button
        disableElevation
        sx={{ color: buttonColor }}
        onClick={onClickHandler}
        variant="contained"
        startIcon={
          timerStarted ? (
            <StopIcon fontSize="medium" />
          ) : (
            <PlayArrowIcon fontSize="medium" />
          )
        }
      >
        {timerStarted ? "STOP" : "START"}
      </Button>
      <span>
        end time<span>{endTimeString}</span>
      </span>
    </div>
  );
});

export default EndTime;
