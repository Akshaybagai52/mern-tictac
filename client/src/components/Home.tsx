import React, { useState } from 'react';
import gameIcon from '../assets/game.svg';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const navigation = useNavigate();
  const [playerNames, setPlayerNames] = useState<{ player1: string; player2: string }>({ player1: '', player2: '' });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false)

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const handlePlayer1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerNames((prevNames) => ({ ...prevNames, player1: e.target.value }));
  };

  const handlePlayer2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerNames((prevNames) => ({ ...prevNames, player2: e.target.value }));
  };

  const handleSubmit = () => {
    setErrorMessage(true)
    if (playerNames.player1 && playerNames.player2) {
      setErrorMessage(false)
      navigation('/game', {
        state: {
          playerNames,
        },
      });
    }
  };

  return (
    <main className="home-container">
      <section>
        <img src={gameIcon} className="game-icon" alt="Game Icon" />
      </section>
      <button onClick={handleOpen}  className="submit-button">Start New Game</button>
      {isOpen && (
        <div className="dialog-overlay ">
          <div className="dialog-content relative p-10">
            <button className="close-button" onClick={handleClose}>X</button>
            <input
              type="text"
              value={playerNames.player1}
              onChange={handlePlayer1Change}
              placeholder="Player 1"
              className="input-field"
            />
            <input
              type="text"
              value={playerNames.player2}
              onChange={handlePlayer2Change}
              placeholder="Player 2"
              className="input-field"
            />
            {!errorMessage ? "" : <span className='inline-block w-full text-red-700 text-left'>Please Fill all the details</span>}
            <button className="submit-button" onClick={handleSubmit}>Start</button>
          </div>
        </div>
      )}
    </main>
  );
}

export default Home;
