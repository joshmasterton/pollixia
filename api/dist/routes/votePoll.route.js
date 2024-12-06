import express from 'express';
import { votePoll } from '../controllers/votePoll.controller.js';
import { verifyToken } from '../middleware/verifyToken.middleware.js';
export const votePollRoute = express.Router();
votePollRoute.post('/votePoll', verifyToken, votePoll);
