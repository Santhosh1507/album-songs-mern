import mongoose from "mongoose";

const connectDB = async () => {
    const db = process.env.MONGO_URI;
   await mongoose.connect(`${db}/spotify`)
        .then(() => console.log("MongoDB connected"))
        .catch(err => console.log(err));
}

export default connectDB;