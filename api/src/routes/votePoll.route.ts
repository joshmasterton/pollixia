import express from 'express';
import { votePoll } from '../controllers/votePoll.controller';
import { verifyToken } from '../middleware/verifyToken.middleware';

export const votePollRoute = express.Router();
votePollRoute.post('/votePoll', verifyToken, votePoll);
