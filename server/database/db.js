import mongoose from "mongoose";

export const connectDB =  () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "MERN STACK LIBRARY MANAGEMENT SYSTEM",
    }).then(() => console.log("MongoDB connected..."))
    .catch((err) => console.error(`MongoDB connection error: ${err}`));

    
};