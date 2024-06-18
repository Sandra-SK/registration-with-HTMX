////////  server.js

import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import {jwtMiddleware} from './middleware/auth.js';
import {User}  from './models/userModel.js';
dotenv.config();

const __dirname = path.dirname('.');
const app = express();


// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Connect to MongoDB

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch((err) => console.log('Connexion à MongoDB échouée !', err));
console.log(User)

// Import des routes
import { authRoutes } from './routes/authRoutes.js';
//import profileRoutes from './routes/profileRoutes.js';


// Routes
app.use('/auth', authRoutes);
//app.use(profileRoutes);



// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });