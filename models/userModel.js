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



// CRUD /////////////////////////////////////////////////////
// Fonction pour créer un nouvel utilisateur
export async function createUser(name, email, password) {
  try {
    const hashedPassword = await User.hashPassword(password);
    const newUser = new User({ name, email, password: hashedPassword });
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    throw error;
  }
}

// Fonction pour récupérer un utilisateur par email
export async function getUserByEmail(email) {
  try {
    const user = await User.findOne({ email: email }).exec();
    return user;
  } catch (error) {
    throw error;
  }
}

// Fonction pour mettre à jour le mot de passe d'un utilisateur
export async function updateUserPassword(email, newPassword) {
  try {
    const hashedPassword = await User.hashPassword(newPassword);
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { password: hashedPassword },
      { new: true }
    ).exec();
    return updatedUser;
  } catch (error) {
    throw error;
  }
}

// Fonction pour supprimer un utilisateur
export async function deleteUser(email) {
  try {
    const deletedUser = await User.findOneAndDelete({ email: email }).exec();
    return deletedUser;
  } catch (error) {
    throw error;
  }
}




