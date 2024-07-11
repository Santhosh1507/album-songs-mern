import { v2 as cloudinary } from 'cloudinary';
import songModel from '../models/songModel.js';

// Function to add a song
const addSong = async (req, res) => {
    try {
        const { name, desc, album } = req.body;

        if (!req.files || !req.files.audio || !req.files.image) {
            return res.status(400).json({
                success: false,
                message: 'Audio and image files are required'
            });
        }

        const audioFile = req.files.audio[0];
        const imageFile = req.files.image[0];

        const [audioUpload, imageUpload] = await Promise.all([
            cloudinary.uploader.upload(audioFile.path, { resource_type: 'video' }),
            cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
        ]);

        const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(audioUpload.duration % 60)}`;

        const songData = {
            name,
            desc,
            album,
            image: imageUpload.secure_url,
            file: audioUpload.secure_url,
            duration
        };

        const song = new songModel(songData);
        await song.save();

        res.status(201).json({
            success: true,
            message: 'Song added successfully',
            song
        });
        console.log(song);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Function to list all songs
const listSong = async (req, res) => {
    try {
        const allSongs = await songModel.find({});
        res.json({
            success: true,
            message: 'All songs',
            songs: allSongs
        });
        console.log(allSongs);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Function to remove a song
const removeSong = async (req, res) => {
    try {

        await songModel.findByIdAndDelete(req.body.id);
        res.json({
            success: true,
            message: 'Song deleted successfully'
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export {
    addSong,
    listSong,
    removeSong
};
