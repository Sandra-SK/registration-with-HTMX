// server.js
const express = require('express');

const mongoose = require('mongoose');

const app = express();
const PORT = 3000;
require ('dotenv').config()


const MONGODB_URI = process.env.MONGODB_URI;

app.use(express.static('public')); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Connect to MongoDB
mongoose.connect(MONGODB_URI)
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch((err) => console.log('Connexion à MongoDB échouée !', err));

// Schéma utilisateur
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});
const User = mongoose.model('User', userSchema);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


//à ajouter:
//import du middleware JWT
//import des routes