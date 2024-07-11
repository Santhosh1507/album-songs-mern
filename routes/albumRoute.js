import express from 'express';
import { addAlbum, listAlbum, removeAlbum } from '../controllers/albumControllers.js';
import upload from '../middleware/multer.js'; // Assuming multer middleware is correctly implemented

const albumRouter = express.Router();

// Route for adding an album with file upload
albumRouter.post('/add', upload.single('image'), addAlbum);

// Route for listing all albums
albumRouter.get('/list', listAlbum);

// Route for removing an album
albumRouter.post('/remove', removeAlbum);

export default albumRouter;
