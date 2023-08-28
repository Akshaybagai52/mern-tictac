import express, { Request, Response } from 'express';
import Game from '../models/game'
const router = express.Router();

router.get('/games', async (req: Request, res: Response) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.post('/games', async (req: Request, res: Response) => {
  const { player1, player2, outcome } = req.body;

  try {
    const newGame = new Game({
      player1,
      player2,
      outcome,
    });

    await newGame.save();
    res.json(newGame);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

export default router;
