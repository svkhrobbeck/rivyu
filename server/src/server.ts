import "express-async-errors";
import express, { Express } from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
// configs
import { connectDB } from "./configs";
// routers
import { authRouter } from "./routers";
// middlewares
import { errorHandlerMiddleware } from "./middlewares";

// initial
const app: Express = express();
const { PORT } = process.env;

// called middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// endpoints
app.use("/api/v1/auth", authRouter);
app.use("*", (req, res) => res.status(401).json({ messages: ["invalid endpoint"] }));

// handlers
app.use(errorHandlerMiddleware);
connectDB();
app.listen(PORT || 3016, () => console.log(`Server is running on port ${PORT}`));
