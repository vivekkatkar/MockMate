import React, { useState, useEffect } from 'react';

const Timer = ({ isRunning }) => {
    const [seconds, setSeconds] = useState(0); // Start from 0 seconds

    useEffect(() => {
        let interval = null;

        if (isRunning) {
            interval = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds + 1); // Count up every second
            }, 1000);
        } else if (!isRunning && seconds !== 0) {
            clearInterval(interval); // Stop the interval when isRunning is false
        }

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [isRunning, seconds]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="timer floating-timer">
            {formatTime(seconds)}
        </div>
    );
};

export default Timer;
