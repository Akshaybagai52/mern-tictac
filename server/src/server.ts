import express from "express";
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import gameRoutes from './routes/gameRoutes';
import cors from 'cors'

const MONGO_URI = 'mongodb+srv://Akshaybagai:OyMNGZj1rxUTThRE@cluster0.8i16ygx.mongodb.net/?retryWrites=true&w=majority';;

mongoose.connect(MONGO_URI);

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});
console.log(process.env.MONGO_URI)
mongoose.connection.on('error', (err) => {
    console.error('Error connecting to MongoDB:', err);
});

const app = express();
app.use(cors())
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Welcome to MERN Tic-tac");
});

app.use('/api', gameRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
