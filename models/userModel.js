/////userModel.js

import bcrypt from 'bcrypt';
const saltRounds = 10;
import {mongoose} from 'mongoose';

//Schéma utilisateur mongoose
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

//hachage du mot de passe avant la sauvegarde
userSchema.statics.hashPassword = async function(password) {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

// Modèle MongoDB pour l'utilisateur
const User = mongoose.model('User', userSchema);
export {User};







