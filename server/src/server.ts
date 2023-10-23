import "express-async-errors";
import express, { Express } from "express";
import morgan from "morgan";
import cors from "cors";
import dotEnv from "dotenv";
import { join } from "path";
import SwaggerUI from "swagger-ui-express";
import { v2 as cloudinary } from "cloudinary";

// configs
import { cloudinaryConfig, connectDB } from "./configs";
import specs from "./specs/swagger.spec";
dotEnv.config({ path: ".env.local" });
cloudinary.config(cloudinaryConfig);

// routers
import { authRouter, notFoundRouter, postsRouter } from "./routers";

// middlewares
import { errorMiddleware, authMiddleware } from "./middlewares";

//* initial
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
app.use("/api/posts", authMiddleware.authCheck, postsRouter);
app.use("*", notFoundRouter);

// handlers
app.use(errorMiddleware);
connectDB();
app.listen(PORT || 3016, () =>
  console.log(`Server is running on port ${PORT}`)
);
