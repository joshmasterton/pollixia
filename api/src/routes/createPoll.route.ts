import express from 'express';
import { createPoll } from '../controllers/createPoll.controller';
import { verifyToken } from '../middleware/verifyToken.middleware';

export const createPollRoute = express.Router();
createPollRoute.post('/createPoll', verifyToken, createPoll);
