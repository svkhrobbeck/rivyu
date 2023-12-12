import "express-async-errors";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import { join } from "path";
import SwaggerUI from "swagger-ui-express";
import { v2 as cld } from "cloudinary";
import startApp from "./app";
import * as typeCustom from "./types/custom";

// configs
import { cldConfig } from "./configs";
import specs from "./specs/swagger.spec";
cld.config(cldConfig);

// routers
import { authRouter, postsRouter } from "./routers";

// middlewares
import { errorMiddleware } from "./middlewares";

const app = express();
app.use(express.static(join(__dirname, "../public")));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// endpoints
app.use("/api/v1/docs/swagger", SwaggerUI.serve, SwaggerUI.setup(specs));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/posts", postsRouter);
app.use("*", errorMiddleware.notFoundRouter);

// handlers
app.use(errorMiddleware.errorHandler);

// start application
startApp(app);
