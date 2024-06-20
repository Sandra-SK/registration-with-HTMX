//userController.js

import { User } from '../models/userModel.js';

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
