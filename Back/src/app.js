import { resolve } from 'path';

import './database/index.js';

import express from 'express';
import cors from 'cors';

import pessoaRoutes from './routes/pessoaRoutes.js';

const whiteList = [
  'http://localhost:3000',
];

const corsOptions = {
  origin: function (origin, callback) {
    if(whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors(corsOptions));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/pessoas/', pessoaRoutes);
  }
}

export default new App().app;
