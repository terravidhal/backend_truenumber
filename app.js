require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const errorHandler = require('./middlewares/errorHandler.middleware');
const User = require('./models/user.model');
const bcrypt = require('bcryptjs');
const dbConfig = require('./config/database.config');
const swaggerOptions = require('./config/swagger.config');

const app = express();

app.use(express.json());
app.use(cors());

// Création d'un flux d'écriture pour les logs d'accès
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('dev'));
app.use(morgan('combined', { stream: accessLogStream }));

const PORT = process.env.PORT || 5000;

// Création auto du compte admin au démarrage
async function ensureAdminAccount() {
  const email = process.env.ADMIN_EMAIL;
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  const role = process.env.ADMIN_ROLE;
  const existing = await User.findOne({ email });
  if (!existing) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new User({ username, email, password: hashedPassword, role, balance: 0 });
    await admin.save();
    console.log('Compte admin auto-créé :', email, '/', password);
  } else {
    console.log('Compte admin déjà existant.');
  }
}

// Connexion à MongoDB (évite les options dépréciées)
app.startDatabase = async () => {
  await mongoose.connect(dbConfig.uri);
  await ensureAdminAccount();
};

// Import des routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const gameRoutes = require('./routes/game.routes');
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/game', gameRoutes);

// Swagger
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Route de test
app.get('/', (req, res) => {
  res.send('API TrueNumber backend opérationnelle');
});

app.use(errorHandler);

module.exports = app; 