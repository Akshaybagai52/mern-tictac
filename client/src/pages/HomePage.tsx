// src/pages/HomePage.tsx

import React, { useState, useEffect } from 'react';
import Home from '../components/Home';

interface Game {
  _id: string;
  player1: string;
  player2: string;
  outcome: string;
}

const HomePage: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/games')
      .then((response) => response.json())
      .then((data) => setGames(data))
      .catch((error) => console.error('Error fetching games:', error));
  }, []);

  return (
    <div>
      <h1>Welcome to Our Website</h1>
      {/* <Home text="Hello from Home Component" onClick={() => {}} /> */}
      <Home />
      <h2>Recent Games</h2>
      <ul>
        {games.map((game) => (
          <>
          {console.log(game)}

          <li key={game._id}>
            {/* <p>{game}</p> */}
            <p>Player 1: {game.player1}</p>
            <p>Player 2: {game.player2}</p>
            <p>Outcome: {game.outcome}</p>
          </li>
          </>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
