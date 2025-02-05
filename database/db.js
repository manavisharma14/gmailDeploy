
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const Connection = () => {
    const DB_URI = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@gmailclone-shard-00-00.snteg.mongodb.net:27017,gmailclone-shard-00-01.snteg.mongodb.net:27017,gmailclone-shard-00-02.snteg.mongodb.net:27017/?ssl=true&replicaSet=atlas-exdw0o-shard-0&authSource=admin&retryWrites=true&w=majority&appName=gmailclone`;
    console.log('database cnnected successfully ')
    try {
        mongoose.connect(DB_URI)
    } catch (error) {
        console.log('error while connecting with the database ', error.message);
    }
}

export default Connection;