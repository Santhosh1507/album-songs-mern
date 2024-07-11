import { addSong, listSong, removeSong} from "../controllers/songControllers.js"
import express from 'express'
import upload from "../middleware/multer.js";

const SongRouter = express.Router();

SongRouter.post('/add',upload.fields([{name:'image',maxCount:1},{name:'audio',maxCount:1}]), addSong)
SongRouter.get('/list', listSong)
SongRouter.post('/remove',removeSong)


export default SongRouter