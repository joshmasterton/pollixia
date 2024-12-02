import express from 'express';
import { createPoll } from '../controllers/createPoll.controller';

export const createPollRoute = express.Router();
createPollRoute.post('/createPoll', createPoll);
