import React from "react";
import Timer from "../components/Timer";
import GameBoard from "../components/GameBoard";
import Clues from "../components/Clues";
import Settings from "../components/Setting";

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        NYT Mini Crossword Clone
      </h1>
      <div className="flex flex-col md:flex-row">
        <GameBoard />
        <Clues />
      </div>
      <Settings />
    </div>
  );
};

export default Home;
