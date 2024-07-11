import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import SongRouter from './routes/songRoute.js';
import connectDB from './config/db.js';
import connectCloudinary from './config/cloudinary.js';
import albumRouter from './routes/albumRoute.js';
import path from 'path';

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
connectDB();
connectCloudinary();

const __dirname = path.resolve();

app.use('/api/song',SongRouter)
app.use('/api/album',albumRouter)


app.use(express.static(path.join(__dirname, '/admin/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin', 'dist', 'index.html'));
});

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
})
