import "express-async-errors";
import express, { Express } from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
// configs
import { connectDB } from "./configs";
// initial
const app: Express = express();
const { PORT } = process.env;

// called middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use("*", (req, res) => res.status(401).json({ msg: "invalid endpoint" }));
connectDB();
app.listen(PORT || 3016, () => console.log(`Server is running on port ${PORT}`));
