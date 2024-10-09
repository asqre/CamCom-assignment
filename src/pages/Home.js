import React, { useState, useCallback, useRef } from "react";
import Crossword from "@jaredreisinger/react-crossword";
import { puzzleData2 } from "../data";
import toast from "react-hot-toast";
import Timer from "../components/Timer";
import Modal from "../components/Modal";
import ModalContent from "../components/ModalContent";

const CrosswordContainer = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCrosswordCorrect, setIsCrosswordCorrect] = useState(false);
  const crosswordRef = useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(true);

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const theme = {
    gridBackground: "rgb(0,0,0)",
    cellBackground: "rgb(255,255,255)",
    cellBorder: "rgb(0,0,0)",
    textColor: "rgb(0,0,0)",
    numberColor: "rgba(0,0,0, 0.25)",
    focusBackground: "#ffda00",
    highlightBackground: "#a7d8ff",
  };

  const handleCrosswordCorrect = useCallback((isCorrect) => {
    if (isCorrect) {
      toast.success(
        "Congratulations! You've completed the crossword correctly!"
      );
    } else {
      toast.error("Some answers are incorrect. Please review and try again.");
    }
    setIsCrosswordCorrect(isCorrect);
  }, []);

  const handleReset = () => {
    crosswordRef.current?.reset();
    setIsLoaded(false);
    setIsCrosswordCorrect(false);
  };

  const handleFillAllAnswers = () => {
    crosswordRef.current?.fillAllAnswers();
    setIsLoaded(true);
  };

  const handleCheckCorrectness = () => {
    const isCorrect = crosswordRef.current?.isCrosswordCorrect();
    setIsCrosswordCorrect(isCorrect);
  };

  return (
    <>
      <div className="w-full max-w-6xl mx-auto p-10 my-5">
        <Timer />
        <div className="crossword-container flex flex-col md:flex-row flex-start gap-16 ">
          <Crossword
            ref={crosswordRef}
            data={puzzleData2}
            theme={theme}
            onCrosswordCorrect={handleCrosswordCorrect}
            onCellChange={(cell) => console.log("clue no", cell)}
            onClueSelected={(clue, number) =>
              console.log("Clue selected", clue, number)
            }
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleReset}
          >
            Reset
          </button>
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded"
            onClick={handleFillAllAnswers}
          >
            Fill All Answers
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleCheckCorrectness}
          >
            Check Correctness
          </button>
        </div>
        {isLoaded && (
          <p className="mt-4">
            Crossword loaded successfully. Correct answers have been applied.
          </p>
        )}
        {isCrosswordCorrect && (
          <p className="mt-4 font-bold text-green-600">
            Congratulations! You've completed the crossword correctly!
          </p>
        )}
      </div>

      <Modal isVisible={isModalVisible} onClose={handleCloseModal}>
        <ModalContent />
      </Modal>
    </>
  );
};

export default CrosswordContainer;
