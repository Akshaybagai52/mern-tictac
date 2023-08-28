import React, { useState } from 'react';
import gameIcon from '../assets/game.svg';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const navigation = useNavigate();
  const [playerNames, setPlayerNames] = useState<{ player1: string; player2: string }>({ player1: '', player2: '' });
  const handlePlayer1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerNames((prevNames) => ({ ...prevNames, player1: e.target.value }));
  };

  const handlePlayer2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerNames((prevNames) => ({ ...prevNames, player2: e.target.value }));
  };

  const handleSubmit = () => {
    if (playerNames.player1 && playerNames.player2) {
      navigation('/game', {
        state: {
          playerNames,
        },
      });
    }
    console.log(playerNames)
  };

  return (
    <>
      <section>
        <img src={gameIcon} className="h-[300px] w-[300px]" alt="Game Icon" />
      </section>
      {/* <button onClick={() => handleSubmit(playerNames.player1)}>Start Game</button> */}
      <input type="text" value={playerNames.player1} onChange={handlePlayer1Change} placeholder="Player 1"  />
      <input type="text" value={playerNames.player2} onChange={handlePlayer2Change} placeholder="Player 2" />
      <button onClick={handleSubmit}>Submit</button>

      <button>
        <Link to="/game">Go to game</Link>
      </button>
    </>
  );
}

export default Home;
