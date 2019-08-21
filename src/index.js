import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import errorhandler from 'errorhandler';
import { serve, setup } from 'swagger-ui-express';
import swaggerDoc from '../public/api-docs/swaggerDoc';
import Router from './routes';

const isProduction = process.env.NODE_ENV === 'production';

// Create global app object
const app = express();
app.use(cors());

// generate api documentation
app.use('/api-docs', serve, setup(swaggerDoc));

// Normal express config defaults
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (!isProduction) {
  app.use(errorhandler());
}

app.get('/', (_req, res) => res.status(301).redirect('/api'));
app.use('/api', Router);

app.use('*', (_req, res) => res.status(404).json({
  status: res.statusCode,
  error: 'Sorry!!, the page you are looking for cannot be found',
}));

export default app;
