import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import {createServer} from 'http';
import AppRouter from './app.router';
import {Database} from './database';

dotenv.config();
try {
    Database.getInstance();
    console.info('Database initialized');
} catch (e) {
    console.error({message: 'Database couldn\'t initialized', error: e});
}

const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: (origin, callback) => {
        callback(null, true);
    },
}));
app.use(AppRouter());

const server = createServer(app);

server.listen(+process.env.APP_PORT);
