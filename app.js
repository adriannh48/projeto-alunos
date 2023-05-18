import dotenv from "dotenv";
import express from "express";
import homeRouter from "./src/routes/homeRoutes";
import userRouter from "./src/routes/userRoutes";
import tokenRouter from "./src/routes/tokenRoutes";
import "./src/database";

const bodyParser = require("body-parser");

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.aplication = dotenv.config();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
  }

  routes() {
    this.app.use("/", homeRouter);
    this.app.use("/users", userRouter);
    this.app.use("/token", tokenRouter);
  }
}

export default new App().app;
