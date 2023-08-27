import { memo } from 'react';

const TaskDetails = memo((props) => {
    const { pomodosroType, theme, task } = props;
    const isPomodoroTypeSelected = pomodosroType === "pomodoro";
    const isRevisionTypeSelected = pomodosroType === "revision";
    const emoji = isPomodoroTypeSelected ? '📌' : (isRevisionTypeSelected ? '📚' : '🕺');
    const textContent = isPomodoroTypeSelected ? (
        task ? `Working on ${task}` : "Time to focus!"
    ) : (isRevisionTypeSelected ? "Time to revise!" : "Time for a break!");

    return (
        <div className="task-container">
            <span>{emoji}</span>
            <span style={{ color: theme.background }}>
                {textContent}
                {task && isPomodoroTypeSelected && (
                    <div style={{ fontWeight: 'normal', fontSize: 20 }}>{task}</div>
                )}
            </span>
        </div>
    );
});

export default TaskDetails;
