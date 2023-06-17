import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import createDebug from 'debug';

export const app = express();

const debug = createDebug('W6:App');

debug('Loaded Express App');

const corsOptions = {
  origin: '*',
};

app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.json());

app.use((_req, _res, next) => {
  debug('');
  next();
});

// Para cuando exista userRouter
// app.use('/user', userRouter);
