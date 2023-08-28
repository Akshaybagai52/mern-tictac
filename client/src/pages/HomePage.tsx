import React, { useState, useEffect } from 'react';
import Home from '../components/Home';
import axios from 'axios'; // Import axios

interface Game {
  _id: string;
  player1: string;
  player2: string;
  outcome: string;
}

const HomePage: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/games') 
      .then((response) => setGames(response.data))
      .catch((error) => console.error('Error fetching games:', error));
  }, []);

  return (
    <div>
      <h1 className='mb-8'>Tic Tac Toe</h1>
      {/* <Home text="Hello from Home Component" onClick={() => {}} /> */}
      <Home />
      <h2 className='mt-10'>Recent Games</h2>
      <div className="p-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Player 1
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Player 2
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Outcome
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {games.map((game) => (
              <tr key={game._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {game.player1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {game.player2}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {game.outcome}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomePage;
