import React from 'react'

interface SquareProps {
  value: string | null
  onSquareClick: () => void
}

interface BoardProps {
  xIsNext: boolean
  squares: Array<string | null>
  onPlay: (nextSquares: Array<string | null>) => void
}

const Square: React.FC<SquareProps> = ({ value, onSquareClick }) => {
  return (
    <button className='square-btn' onClick={onSquareClick}>
      {value}
    </button>
  )
}

const Board: React.FC<BoardProps> = ({ xIsNext, squares, onPlay }) => {
  function handleClick (i: number): void {
    const nextSquares = squares.slice()
    if (squares[i] || calculateWinner(squares)) {
      return
    }
    nextSquares[i] = xIsNext ? 'X' : 'O'
    onPlay(nextSquares)
  }

  const winner = calculateWinner(squares)
  let status
  if (winner) {
    status = 'Winner: ' + winner
  } else {
    status = 'Next Player: ' + (xIsNext ? 'X' : 'O')
  }

  return (
    <main className='grid grid-cols-1'>
      <div>{status}</div>
      <section className=''>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </section>
      <section>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </section>
      <section>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </section>
    </main>
  )
}

export function calculateWinner (squares: Array<string | null>): string | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

export default Board
