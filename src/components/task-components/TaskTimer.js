import { useState, useEffect, useCallback, memo } from "react";
import { formatSecondsIntoMinutesAndSeconds } from "../../utils/date";
import useTimer from "../../utils/useTimer";
import EndTime from "./EndTime";
import ring from '../../images/ring.mp3'

const TaskTimer = memo((props) => {
  const { pomodoroType, theme, timeLeft, id, timerStarted } = props;

  const [stateTimerStarted, setStateTimerStarted] = useState(timerStarted);

  const callback = useCallback(() => {
    setStateTimerStarted(false);
  }, []);

  const [seconds, setSeconds] = useTimer(stateTimerStarted, timeLeft, callback);

  useEffect(() => {
    setStateTimerStarted(timerStarted);
  }, [timerStarted]);

  useEffect(() => {
    setSeconds(timeLeft);
  }, [id, timeLeft, setSeconds]);

  useEffect(() => {
    if (seconds === 0) {
      showNotification("Timer Finished", `Time's for ${pomodoroType} up!`);
      // Additional logic like switching to the next task, if needed
    }
  }, [seconds]);

  // Function to show the notification
  const showNotification = (title, message) => {
    const audio = new Audio(ring); // Path to your audio file
    audio.play();
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          const notification = new Notification(title, {
            body: message,
            icon: "/path/to/notification-icon.png", // Set the path to your notification icon
            volume: 0,
          });
  
          // Auto-dismiss the notification after 10 seconds
          setTimeout(() => {
            notification.close();
          }, 5000); // 10000 milliseconds = 10 seconds
        }
      });
    }
  };

  const timerString = formatSecondsIntoMinutesAndSeconds(seconds);
  return (
    <>
      <div className="timer-label">{timerString}</div>
      <EndTime
        buttonColor={theme.background}
        timerStarted={stateTimerStarted}
        setTimerStarted={(prev) => setStateTimerStarted(prev)}
        id={id}
        timeLeft={timeLeft}
        seconds={seconds}
        pomodoroType={pomodoroType}
      />
    </>
  );
});

export default TaskTimer;
