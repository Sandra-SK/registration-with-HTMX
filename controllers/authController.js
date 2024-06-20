//authController.js

import { User } from '../models/userModel.js';

export async function checkToken (req, res) {
  try{
      let  user = await User.findById(req.user_id)
      if(!user){
          res.status(404).json({status: 404, err: "User not found", user: user})
      }
      res.json({status: 200, user: user[0]})
  } catch (error){
      res.status(500).json({status: 500, err: "Internal Server Error"})
  }
      
}