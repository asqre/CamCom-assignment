import React, { forwardRef, useEffect, useRef } from 'react';

const InputCell = forwardRef(({ value, onChange, onKeyDown, isFocused }, ref) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <input
      ref={(el) => {
        inputRef.current = el;
        if (typeof ref === 'function') {
          ref(el);
        } else if (ref) {
          ref.current = el;
        }
      }}
      type="text"
      maxLength="1"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className={`w-10 h-10 text-center text-xl border-none focus:outline-none transition-colors duration-300 ${
        isFocused ? 'bg-blue-200' : 'focus:bg-gray-200'
      }`}
    />
  );
});

export default InputCell;