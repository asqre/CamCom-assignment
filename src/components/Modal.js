import React from "react";

const Modal = ({ isVisible, onClose, children, backgroundColor }) => {
  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "wrapper") {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="w-[600px]">
        <div className="md:w-[600px] w-[90%] mx-auto flex flex-col">
          <button
            className="text-white text-xl place-self-end"
            onClick={() => onClose()}
          >
            X
          </button>
          <div
            className="p-2"
            style={{
              backgroundColor: backgroundColor ? backgroundColor : "#F8F8F8",
              borderRadius: "18px",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
