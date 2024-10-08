import React, { useState, useEffect } from "react";
import { FaCirclePlay } from "react-icons/fa6";
import { FaPauseCircle } from "react-icons/fa";

const Timer = ({ onTimeUp, isCrosswordCorrect }) => {
  const initialTime = 120;
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    const elem = document.getElementById("crossword");
    if (!isRunning && !isCrosswordCorrect) {
      elem.style.filter = "blur(5px)";
      elem.style.pointerEvents = "none";
    } else {
      elem.style.filter = "blur(0px)";
      elem.style.pointerEvents = "auto";
    }
  }, [isRunning, time]);

  useEffect(() => {
    if (isCrosswordCorrect) {
      setIsRunning(false);
      setTime(initialTime);
    }
  }, [isCrosswordCorrect]);

  useEffect(() => {
    let timerInterval;

    if (isRunning && time > 0) {
      timerInterval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
      setTime(initialTime);
      onTimeUp();
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [isRunning, time, onTimeUp]);

  const handlePlay = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div className="flex flex-row items-center justify-center gap-4 p-4">
      <p className="text-xl">{formatTime(time)}</p>
      <button>
        {isRunning ? (
          <FaPauseCircle onClick={handlePause} size={20} />
        ) : (
          <FaCirclePlay onClick={handlePlay} size={20} />
        )}
      </button>
    </div>
  );
};

export default Timer;
