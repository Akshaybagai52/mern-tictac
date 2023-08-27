import mongoose, { Document } from 'mongoose';

interface IGame extends Document {
  player1: string;
  player2: string;
  outcome: string;
}

const gameSchema = new mongoose.Schema<IGame>({
  player1: String,
  player2: String,
  outcome: String,
});

export default mongoose.model<IGame>('Game', gameSchema);
