///// authRoutes.js


import express from 'express'
import { jwtMiddleware } from '../middleware/auth.js';
import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv';
import { User } from '../models/userModel.js';

dotenv.config();

const router = express.Router();

router.get('/checkToken', jwtMiddleware, async (req, res) => {
    try{
        let  user = await User.findById(req.user_id)
        if(!user){
            res.status(404).json({status: 404, err: "User not found", user: user})
        }
        res.json({status: 200, user: user[0]})
    } catch (error){
        res.status(500).json({status: 500, err: "Internal Server Error"})
    }
        
}) 
export {router as authRoutes}