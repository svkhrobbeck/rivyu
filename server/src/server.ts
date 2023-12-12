import "express-async-errors";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import { join } from "path";
import SwaggerUI from "swagger-ui-express";
import { v2 as cld } from "cloudinary";
import startApp from "./app";

// configs
import { cldConfig } from "./configs";
import specs from "./specs/swagger.spec";
cld.config(cldConfig);

// routers
import { authRouter, notFoundRouter, postsRouter } from "./routers";

// middlewares
import { errorMiddleware, authMiddleware } from "./middlewares";

const app = express();
app.use(express.static(join(__dirname, "../public")));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// endpoints
app.use("/api/docs/swagger", SwaggerUI.serve, SwaggerUI.setup(specs));
app.use("/api/auth", authRouter);
app.use("/api/posts", authMiddleware.authCheck, postsRouter);
app.use("*", notFoundRouter);

// handlers
app.use(errorMiddleware);

// start application
startApp(app);
