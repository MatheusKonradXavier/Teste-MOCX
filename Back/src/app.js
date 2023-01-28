import { resolve } from 'path';

import './database/index.js';

import express from 'express';
import cors from 'cors';

import pessoaRoutes from './routes/pessoaRoutes.js';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    //this.app.use(cors(corsOptions));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/pessoas/', pessoaRoutes);
  }
}

export default new App().app;
