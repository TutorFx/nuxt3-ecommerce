import mongoose from "mongoose";

// Conecta no MongoDB
mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = global.Promise;

export default mongoose;