import "express-async-errors";
import express, { Express } from "express";
import morgan from "morgan";
import cors from "cors";
import dotEnv from "dotenv";
import { join } from "path";
import SwaggerUI from "swagger-ui-express";
// configs
import { connectDB } from "./configs";
dotEnv.config({ path: ".env.local" });
import specs from "./specs/swagger.spec";
// routers
import { authRouter, notFoundRouter, postsRouter } from "./routers";
// middlewares
import { errorHandlerMiddleware } from "./middlewares";
import { authCheck } from "./middlewares/auth.middleware";

// initial
const app: Express = express();
const { PORT } = process.env;

// use
app.use(express.static(join(__dirname, "../public")));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// endpoints
app.use("/docs/swagger", SwaggerUI.serve, SwaggerUI.setup(specs));
app.use("/api/auth", authRouter);
app.use("/api/posts", authCheck, postsRouter);
app.use("*", notFoundRouter);

// handlers
app.use(errorHandlerMiddleware);
connectDB();
app.listen(PORT || 3016, () =>
  console.log(`Server is running on port ${PORT}`)
);
