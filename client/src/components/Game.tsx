import Board, { calculateWinner } from './Square'
import { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import { useLocation } from 'react-router-dom';

const Game = () => {
    const data = useLocation()
    
    const [xIsNext, setXIsNext] = useState<boolean>(true);
    const [history, setHistory] = useState<Array<Array<string | null>>>([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState<number>(0);
    const [gameFinished, setGameFinished] = useState<boolean>(false);

    const squares = history[currentMove];
    const winner = calculateWinner(squares);

    function handlePlay(nextSquares: Array<null | string>) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
        setXIsNext(!xIsNext);
    }

    function jumpTo(nextMove: number): void {
        setCurrentMove(nextMove);
        setXIsNext(nextMove % 2 === 0);
        setGameFinished(false);
    }

    useEffect(() => {
        if (winner) {
            setGameFinished(true);
        }
    }, [winner]);

    useEffect(() => {
        if (gameFinished && winner) {
            const winnerData = {
                player1: data.state.playerNames.player1,
                player2:data.state.playerNames.player2,
                outcome: winner==="X" ?  data.state.playerNames.player1 + " won" :data.state.playerNames.player2 + " won" 
            };

            axios.post('http://localhost:3000/api/games', winnerData)
                .then(response => {
                    console.log('Winner submitted:', response.data);
                })
                .catch(error => {
                    console.error('Error submitting winner:', error);
                });
        }
    }, [gameFinished, winner]);

    const moves = history.map((squares, move) => {
        let description: string;
        move > 0 ? description = "Go to move #" + move : description = "Go to game start";
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)} className='p-2 bg-gray-300 my-2'>{description}</button>
            </li>
        );
    });

    return (
        <section className='flex gap-6'>
            <div>
                <Board xIsNext={xIsNext} squares={squares} onPlay={handlePlay} />
            </div>
            <div>
                <ol>{moves}</ol>
            </div>
        </section>
    );
}

export default Game;
