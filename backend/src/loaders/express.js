import cors from 'cors';
import express from 'express';
import { apiPrefix } from '../config/index.js';
import { errorHandler } from '../api/middlewares/errorHandler.middleware.js';
import cookieParser from 'cookie-parser';
import router from '../api/routers/index.js';

const corsConfig = {
  origin: ['http://localhost:5173', 'http://localhost:5173/'],
  credentials: true,
};

export default (app) => {
  app.disable('x-powered-by');
  app.disable('etag');
  app.use([cors(corsConfig), express.json(), cookieParser()]);
  app.use(apiPrefix, router);
  app.use(errorHandler);
}
