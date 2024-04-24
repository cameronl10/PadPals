import express from 'express';
const router = express.Router();
const app = express();
import jwt from 'jsonwebtoken';

import auth from './auth';

app.use(express.json());

app.get('/', (req, res) => {

    res.send('Hello World');
});

app.use('/auth', auth);

app.listen(3000)