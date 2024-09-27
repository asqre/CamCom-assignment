import React, { useState, useRef, useEffect } from 'react';
import InputCell from './InputCell';
import Timer from './Timer';
import { puzzleData } from '../data';

const GameBoard = () => {
  const [grid, setGrid] = useState(puzzleData.grid.map(row => row.map(cell => cell === '' ? '' : ' ')));
  const [direction, setDirection] = useState('across');
  const [activeCell, setActiveCell] = useState({ row: 0, col: 0 });
  const [isComplete, setIsComplete] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [finalTime, setFinalTime] = useState(0);
  const cellRefs = useRef([]);

  useEffect(() => { 
    cellRefs.current = Array(grid.length).fill().map(() => Array(grid[0].length).fill(null));
  }, []);

  const handleCellChange = (row, col, value) => {
    const newGrid = [...grid];
    newGrid[row][col] = value.toUpperCase();
    setGrid(newGrid);

    if (value !== '') {
      moveToNextCell(row, col);
    }

    checkCompletion(newGrid);
  };

  const moveToNextCell = (row, col) => {
    let nextRow = row;
    let nextCol = col;

    if (direction === 'across') {
      nextCol = col + 1;
      if (nextCol >= grid[row].length || grid[row][nextCol] === '') {
        nextCol = col;
      }
    } else {
      nextRow = row + 1;
      if (nextRow >= grid.length || grid[nextRow][col] === '') {
        nextRow = row;
      }
    }

    if (nextRow !== row || nextCol !== col) {
      setActiveCell({ row: nextRow, col: nextCol });
      cellRefs.current[nextRow][nextCol].focus();
    }
  };

  const handleKeyDown = (e, row, col) => {
    if (e.key === 'ArrowRight') {
      setDirection('across');
      moveToNextCell(row, col);
    } else if (e.key === 'ArrowLeft') {
      setDirection('across');
      moveToNextCell(row, col - 2);
    } else if (e.key === 'ArrowDown') {
      setDirection('down');
      moveToNextCell(row, col);
    } else if (e.key === 'ArrowUp') {
      setDirection('down');
      moveToNextCell(row - 2, col);
    } else if (e.key === 'Backspace' && grid[row][col] === ' ') {
      moveToNextCell(row, col - 2);
    }
  };

  const checkCompletion = (currentGrid) => {
    const isComplete = currentGrid.every((row, i) =>
      row.every((cell, j) => cell === puzzleData.solution[i][j] || puzzleData.solution[i][j] === '')
    );
    if (isComplete) {
      setIsComplete(true);
      setIsTimerRunning(false);
    }
  };

  const handleCheck = () => {
    const incorrectCells = [];
    grid.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell !== ' ' && cell !== puzzleData.solution[i][j] && puzzleData.solution[i][j] !== '') {
          incorrectCells.push({ row: i, col: j });
        }
      });
    });

    incorrectCells.forEach(({ row, col }) => {
      const cellRef = cellRefs.current[row] && cellRefs.current[row][col];
      if (cellRef && cellRef.classList) {
        cellRef.classList.add('bg-red-200');
        setTimeout(() => {
          cellRef.classList.remove('bg-red-200');
        }, 2000);
      }
    });

    if (incorrectCells.length === 0) {
      setIsComplete(true);
      setIsTimerRunning(false);
    }
  };

  const handleTimeUpdate = (time) => {
    if (isComplete) {
      setFinalTime(time);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Crossword Puzzle</h2>
      <Timer isRunning={isTimerRunning} onTimeUpdate={handleTimeUpdate} />
      <div className="grid grid-cols-5 gap-px bg-gray-800 mb-4">
        {grid.map((row, rowIndex) => (
          row.map((cell, colIndex) => (
            <div key={`${rowIndex}-${colIndex}`} className="relative">
              {puzzleData.grid[rowIndex][colIndex] !== '' && (
                <span className="absolute top-0 left-0 text-xs p-1">
                  {puzzleData.grid[rowIndex][colIndex]}
                </span>
              )}
              {cell !== '' ? (
                <InputCell
                  ref={el => {
                    if (cellRefs.current[rowIndex]) {
                      cellRefs.current[rowIndex][colIndex] = el;
                    }
                  }}
                  value={cell}
                  onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                  isFocused={activeCell.row === rowIndex && activeCell.col === colIndex}
                />
              ) : (
                <div className="w-10 h-10 bg-black"></div>
              )}
            </div>
          ))
        ))}
      </div>
      <button 
        onClick={handleCheck}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Check Answers
      </button>
      {isComplete && (
        <div className="mt-4 text-2xl font-bold text-green-500 animate-bounce">
          Congratulations! You've completed the crossword in {Math.floor(finalTime / 60)}:{(finalTime % 60).toString().padStart(2, '0')}!
        </div>
      )}
    </div>
  );
};

export default GameBoard;