import React from 'react'
import gameIcon from '../assets/game.svg'
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
     <section>
        <img src={gameIcon} className='h-[300px] w-[300px]' />
    </section>
    <button><Link to='game'>Start Game</Link> </button>
    </>
   
  )
}

export default Home