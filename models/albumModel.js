import mongoose from "mongoose";

const albumSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    bgColour: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

const albumModel =mongoose.model.album || mongoose.model("Album", albumSchema);

export default albumModel;