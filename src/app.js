import dotenv from 'dotenv';
import express from 'express';
import { resolve } from 'path';

import homeRouter from './routes/homeRoutes';
import userRouter from './routes/userRoutes';
import tokenRouter from './routes/tokenRoutes';
import studentRouter from './routes/studentRoutes';
import pictureRouter from './routes/pictureRoutes';

import './database';

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
    this.app.use(express.static(resolve(__dirname, 'uplouds')));
  }

  routes() {
    this.app.use('/', homeRouter);
    this.app.use('/users/', userRouter);
    this.app.use('/token/', tokenRouter);
    this.app.use('/student/', studentRouter);
    this.app.use('/picture/', pictureRouter);
  }
}

export default new App().app;
