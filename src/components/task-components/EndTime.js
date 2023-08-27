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
  const { short, long, study, revise, whiteNoise, motivation } =
    useContext(timerContext);
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
    endTimeDelta = revise; // Use the revise timer value
  }

  endTime.setMinutes(endTime.getMinutes() + Math.round(endTimeDelta / 60));
  const endTimeString = serialiseDate(endTime);

  const onClickHandler = () => {
    // Stop any previously playing audio
    // Stop any previously playing audio
    console.log(audio, timerStarted);
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    if (!timerStarted) {
      // Play the appropriate sound based on the timer type
      if (
        (pomodoroType === "pomodoro" || pomodoroType === "revision") &&
        whiteNoise
      ) {
        const newAudio = new Audio(wn);
        setAudio(newAudio);
        newAudio.play();
      } else if (pomodoroType === "short_break" && motivation) {
        const newAudio = new Audio(motivation1);
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
