import React, { useEffect, useState } from "react";

const Timer = ({ props }) => {
  // Initialize state for error handling and timer
  const [error, setError] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    // Check if props are valid
    if (!props || !props[0] || !props[0].header || !props[0].header.status || !props[0].header.status.liveTime) {
      setError(true);
      return;
    }

    // Extract minutes and seconds from props
    const data = props[0];
    const splitter = data.header.status.liveTime.long.split(":");
    const initialMinutes = parseInt(splitter[0], 10); // Convert to number
    const initialSeconds = parseInt(splitter[1], 10); // Convert to number

    // Set initial time
    const newTime = initialMinutes * 60 + initialSeconds;
    setTime(newTime);

    // Increment the timer every second
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    // Cleanup on component unmount
    return () => clearInterval(interval);
  }, [props]);

  // Format time into MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  if (error) {
    return <div>Error: Invalid props structure</div>;
  }

  return (
    <div id="timer" style={{ fontSize: '1em', fontFamily: 'Arial, sans-serif' }}>
      {formatTime(time)}
    </div>
  );
};

export default Timer;
