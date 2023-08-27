import Board from './Square'
import { useState } from 'react';

const Game = () => {
    const [xIsNext, setXIsNext] = useState<boolean>(true);
    const [history, setHistory] = useState<Array<Array<string | null>>>([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState<number>(0);

    const squares = history[currentMove];
    function handlePlay(nextSquares:Array<null | string>) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
        setXIsNext(!xIsNext)
    }
    function jumpTo(nextMove:number):void {
        setCurrentMove(nextMove);
        setXIsNext(nextMove % 2 === 0);

    }
    const moves = history.map((squares, move) => {
        let description:string;
        move > 0 ? description = "Go to move #" + move : description = "Go to game start";
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)} className='p-2 bg-gray-300 my-2'>{description}</button>
            </li>
        )
    })
    return (
        <section className='flex gap-6'>

            <div>
                <Board xIsNext={xIsNext} squares={squares} onPlay={handlePlay} />
            </div>
            <div>
                <ol>{moves}</ol>

            </div>
        </section>

    )
}

export default Game