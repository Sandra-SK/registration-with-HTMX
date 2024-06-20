///// authRoutes.js


import express from 'express'
import { jwtMiddleware } from '../middleware/auth.js';
import * as dotenv from 'dotenv';
import { checkToken } from '../controllers/authController.js';


dotenv.config();

const router = express.Router();

router.get('/checkToken', jwtMiddleware, checkToken);



export {router as authRoutes}