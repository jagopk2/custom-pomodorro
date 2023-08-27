import { useState, useEffect, useContext, memo } from "react";
import { PomodoroContext } from "../context/PomodoroContext";
import TaskType from "./task-components/TaskType";
import TaskDetails from "./task-components/TaskDetails";
import TaskTimer from "./task-components/TaskTimer";
import background from "../images/walpaper.jpg";
import { timerContext } from "../App";

const ACTIVE_TASK_DEFAULT = { id: -1, timeLeft: 1500, timerStarted: false };

const MainTask = memo((props) => {
  const { activeTaskId, tasks, dispatch } = useContext(PomodoroContext);
  const [activeTask, setActiveTask] = useState(ACTIVE_TASK_DEFAULT);
  const [pomodoroType, setPomodoroType] = useState("pomodoro");
  const { timeLeft, id, task, taskNo, taskCount, timerStarted, completed } =
    activeTask;
  const { themes } = props;
  const { short, long, study, revise } = useContext(timerContext);
  console.log(props)

  // if there is an active task, i.e. the timer is running, then store the data inside the activeTask hook
  useEffect(() => {
    if (activeTaskId !== -1) {
      setActiveTask(tasks.filter((row) => row.id === activeTaskId)[0]);
    } else {
    }
  }, [activeTaskId, tasks]);

  // when task is completed i.e. timer has reached 0 seconds or via button, show the short break option
  useEffect(() => {
    if (completed) {
      setPomodoroType("short_break");
    }
  }, [completed]);

  // if type is changed from pomodoro to short break or study break, reset the active task
  useEffect(() => {
    if (
      id &&
      id !== -1 &&
      (pomodoroType === "long_break" || pomodoroType === "short_break" || pomodoroType === "revision" )
    ) {
      dispatch({ type: "resetted_active_task" });
      setActiveTask(ACTIVE_TASK_DEFAULT);
    }
  }, [pomodoroType, id, dispatch]);

  useEffect(() => {
    if (id === -1) {
      if (pomodoroType === "pomodoro") {
        setActiveTask((task) => ({ ...task, timeLeft: study }));
      } else if (pomodoroType === "short_break") {
        setActiveTask((task) => ({ ...task, timeLeft: short }));
      } else if (pomodoroType === "long_break") {
        setActiveTask((task) => ({ ...task, timeLeft: long }));
      } else if (pomodoroType === "revision") {
        setActiveTask((task) => ({ ...task, timeLeft: revise }));
      }
    }
  }, [pomodoroType, id]);

  // whenever there is no active task, i.e. a task from the grid is not active, then default to pomodoro option
  useEffect(() => {
    if (activeTaskId !== -1) {
      setPomodoroType("pomodoro");
    }
  }, [activeTaskId]);

  return (
    <div
      className="main-task-background"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="main-task-container">
        <TaskType
          timerStarted={timerStarted}
          pomodoroType={pomodoroType}
          setPomodoroType={(type) => setPomodoroType(type)}
        />
        <TaskDetails
          pomodosroType={pomodoroType}
          id={id}
          theme={themes[pomodoroType]}
          task={task ? `${task} (${taskNo}/${taskCount})` : undefined}
        />
        <TaskTimer
          timeLeft={timeLeft}
          id={id}
          timerStarted={timerStarted}
          pomodoroType={pomodoroType}
          theme={themes[pomodoroType]}
        />
      </div>
    </div>
  );
});
export default MainTask;
