import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const tokenSecret = process.env.TOKEN_SECRET;

export const jwtMiddleware = (req, res, next) =>{

    const token = req.headers['x-access-token'];
    
    if(token === undefined) {
      res.json({status: 404, msg:"Attention: Token d'identification undefined"})
      
  } else {
      //si il y a un token on vérifie qu'il est bon
      jwt.verify(token, secret, (err, decode)=>{
          if(err){
              // mauvais token !
              res.json({status: 401, msg: "Attention: Token d'identification invalide"});
          } else {
              req.user_id = decode.user_id;
              next()
          }
      })   
  }   
}