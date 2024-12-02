import express from 'express';
import { votePoll } from '../controllers/votePoll.controller';

export const votePollRoute = express.Router();
votePollRoute.post('/votePoll', votePoll);
