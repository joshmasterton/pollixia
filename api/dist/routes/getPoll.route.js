import express from 'express';
import { getPoll } from '../controllers/getPoll.controller.js';
export const getPollRoute = express.Router();
getPollRoute.get('/getPoll', getPoll);
