/* eslint-disable import/no-extraneous-dependencies */
import dotenv from 'dotenv';
import express from 'express';
import { resolve } from 'path';
import cors from 'cors';
import helmet from 'helmet';

import homeRouter from './routes/homeRoutes';
import userRouter from './routes/userRoutes';
import tokenRouter from './routes/tokenRoutes';
import studentRouter from './routes/studentRoutes';
import pictureRouter from './routes/pictureRoutes';

import './database';

const whiteList = [
  'http//localhost:3000',
];

const corsOption = {
  origin(origin, call) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      call(null, true);
    } else {
      call(new Error('Not allowed by CORS'));
    }
  },
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.aplication = dotenv.config();
  }

  middlewares() {
    this.app.use(cors(corsOption));
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use('/images/', express.static(resolve(__dirname, '..', 'uplouds', 'images')));
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
