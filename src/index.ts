import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/authroute";
import taskRoutes from "./routes/taskroute";
import connectDB from "./config/db";
import authMiddleware from "./middleware/authmiddleware";

dotenv.config();
const app = express();
connectDB();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
