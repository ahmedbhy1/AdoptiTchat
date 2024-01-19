import cors from 'cors';
import express from 'express';
import { apiPrefix } from '../config/index.js';
import router from '../api/routers/index.js';

export default (app) => {
  app.use(cors());
  app.use(express.json());
  app.use(apiPrefix, router)
  app.disable('x-powered-by');
  app.disable('etag');
}
