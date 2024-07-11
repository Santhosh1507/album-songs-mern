import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import SongRouter from './routes/songRoute.js';
import connectDB from './config/db.js';
import connectCloudinary from './config/cloudinary.js';
import albumRouter from './routes/albumRoute.js';

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
connectDB();
connectCloudinary();

app.use('/api/song',SongRouter)
app.use('/api/album',albumRouter)


app.get('/',(req,res)=>{
    res.send("Api working")
})

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
})
