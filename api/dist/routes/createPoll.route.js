import express from 'express';
import { createPoll } from '../controllers/createPoll.controller.js';
import { verifyToken } from '../middleware/verifyToken.middleware.js';
export const createPollRoute = express.Router();
createPollRoute.post('/createPoll', verifyToken, createPoll);
