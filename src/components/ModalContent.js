import React from "react";

const ModalContent = ({ isCorrect, showAnswer, onClose }) => {
  return (
    <div className="p-4">
      {isCorrect ? (
        <h2 className="text-lg font-bold text-green-600">
          Congratulations! You've completed the crossword correctly!
        </h2>
      ) : (
        <>
          <h2 className="text-lg font-bold text-red-600">Time's up!</h2>
          <p>Would you like to see the correct answers?</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            onClick={() => {
              showAnswer();
              onClose();
            }}
          >
            Show Answers
          </button>
        </>
      )}
    </div>
  );
};

export default ModalContent;
