import React from 'react';
import { puzzleData } from '../data'

const Clues = () => {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h3 className="text-xl font-bold mb-2">Across</h3>
        <ul className="list-decimal list-inside">
          {puzzleData.clues.across.map((clue) => (
            <li key={clue.number} className="mb-1">
              <span className="font-bold">{clue.number}.</span> {clue.clue}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">Down</h3>
        <ul className="list-decimal list-inside">
          {puzzleData.clues.down.map((clue) => (
            <li key={clue.number} className="mb-1">
              <span className="font-bold">{clue.number}.</span> {clue.clue}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Clues;