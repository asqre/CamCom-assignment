import React, { useState, useCallback, useRef } from "react";
import Crossword from "@jaredreisinger/react-crossword";
import { puzzleData2 } from "../data";
import toast from "react-hot-toast";
import Timer from "../components/Timer";
import Modal from "../components/Modal";
import ModalContent from "../components/ModalContent";

const CrosswordContainer = () => {
  const [isCrosswordCorrect, setIsCrosswordCorrect] = useState(false);
  const crosswordRef = useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleTimeUp = () => {
    setIsModalVisible(true);
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
      setIsCrosswordCorrect(true);
    } else {
      toast.error("Some answers are incorrect. Please review and try again.");
      setIsCrosswordCorrect(false);
    }
    setIsModalVisible(true);
  }, []);

  const handleReset = () => {
    crosswordRef.current?.reset();
    setIsCrosswordCorrect(false);
    setIsAnswerVisible(false);
  };

  const handleFillAllAnswers = () => {
    setIsAnswerVisible(true);
    crosswordRef.current?.fillAllAnswers();
  };

  return (
    <>
      <div className="w-full max-w-6xl mx-auto p-10 my-5">
        <h1 className="text-3xl font-bold text-center mb-4">
          NYT Mini Crossword
        </h1>
        <Timer onTimeUp={handleTimeUp} isCrosswordCorrect={isCrosswordCorrect}/>
        <div id="crossword" className="crossword-container flex flex-col md:flex-row flex-start gap-16 ">
          <Crossword
            ref={crosswordRef}
            data={puzzleData2}
            theme={theme}
            onCrosswordCorrect={!isAnswerVisible && handleCrosswordCorrect}
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
        </div>
      </div>

      <Modal isVisible={isModalVisible} onClose={handleCloseModal}>
        <ModalContent
          isCorrect={isCrosswordCorrect}
          onClose={handleCloseModal}
          showAnswer={handleFillAllAnswers}
        />
      </Modal>
    </>
  );
};

export default CrosswordContainer;
