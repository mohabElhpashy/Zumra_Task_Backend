import dotenv from "dotenv";
import mongoose from "mongoose";
import { app } from "./app";

dotenv.config();

mongoose.connect(process.env.MONGO_URI!);

const PORT = process.env.PORT || 8000;

app.listen(PORT);
