require('dotenv').config();

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectDB } from './app/config/db';
import router from './app/routes';
import helmet from 'helmet';
import { ResponseStatus } from './app/enum/responseEnum';
import { ResponseErrors } from './app/models/error-messages.model';

connectDB();

const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(router);

app.use(function (req, res, next) {
  res.status(ResponseStatus.NOT_FOUND).json({ message: ResponseErrors.NOT_FOUND });
});

const PORT = process.env.PORT ?? 8080;

app.listen(PORT, () => {
  console.log('Server is listening on port ', PORT);
});
