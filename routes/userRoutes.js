//userRoutes.js

import express from 'express';
import { createUser, getUserByEmail, updateUserPassword, deleteUser } from '../controllers/userController.js';
import { jwtMiddleware } from '../middleware/auth.js';


const router = express.Router();
router.use(jwtMiddleware);


// Route pour créer un nouvel utilisateur
router.post('/users', async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const newUser = await createUser(name, email, password);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Route pour récupérer un utilisateur par email
  router.get('/users/:email', async (req, res) => {
    const { email } = req.params;
    try {
      const user = await getUserByEmail(email);
      if (!user) {
        res.status(404).json({ message: 'Utilisateur non trouvé' });
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Route pour mettre à jour le mot de passe d'un utilisateur
  router.put('/users/:email', async (req, res) => {
    const { email } = req.params;
    const { newPassword } = req.body;
    try {
      const updatedUser = await updateUserPassword(email, newPassword);
      if (!updatedUser) {
        res.status(404).json({ message: 'Utilisateur non trouvé' });
      } else {
        res.status(200).json(updatedUser);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Route pour supprimer un utilisateur
  router.delete('/users/:email', async (req, res) => {
    const { email } = req.params;
    try {
      const deletedUser = await deleteUser(email);
      if (!deletedUser) {
        res.status(404).json({ message: 'Utilisateur non trouvé' });
      } else {
        res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

export { router as userRoutes };

