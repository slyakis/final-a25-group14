import React, {useState, useEffect} from 'react';

const Timer = ({ duration = 120, onTimeUp}) => {
    const [timeRemaining, setTimeRemaining] = useState(duration);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let timerInterval;

        if (isRunning && timeRemaining > 0) {
            timerInterval = setInterval(() => {
                setTimeRemaining((prev) => prev - 1);
            }, 1000);
        }

        if (timeRemaining === 0) {
            clearInterval(timerInterval);
            setIsRunning(false);
            if (onTimeUp) onTimeUp();
        }

        return () => clearInterval(timerInterval);
    }, [isRunning, timeRemaining, onTimeUp]);

    // const startTimer = () => {
    //     if (timeRemaining > 0) setIsRunning(true);
    // }
    //
    // const pauseTimer = () => setIsRunning(false);
    //
    // const resetTimer = () => {
    //     setIsRunning(false);
    //     setTimeRemaining(duration);
    // }

    const toggleTimer = () => {
        setIsRunning((prev) => !prev);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    return (
        <div
            className="nes-container is-rounded is-dark"
            style={{
                width: '200px',
                margin: '10px auto',
                textAlign: 'center',
                padding: '10px',
            }}
        >
            <h3 className="nes-text is-warning">Timer</h3>
            <p
                style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    margin: '10px 0',
                }}
            >
                {formatTime(timeRemaining)}
            </p>

            <button
                type="button"
                className={`nes-btn ${isRunning ? "is-warning" : "is-success"}`}
                onClick={toggleTimer}
            >
                {isRunning ? "Pause" : "Resume"}
            </button>
        </div>
    );
};

export default Timer;