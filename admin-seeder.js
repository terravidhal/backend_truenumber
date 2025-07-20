require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/user.model');
const dbConfig = require('./config/database.config');

const MONGO_URI = process.env.MONGO_URI ;

async function createAdmin() {
  await mongoose.connect(MONGO_URI);

  const email = process.env.ADMIN_EMAIL;
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  const phone = '';
  const role = process.env.ADMIN_ROLE;


  const existing = await User.findOne({ email });
  if (existing) {
    console.log('Un compte admin existe déjà.');
    process.exit(0);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = new User({ username, email, password: hashedPassword, phone, role, balance: 0 });
  await admin.save();
  console.log('Compte admin créé avec succès :', email, '/', password);
  process.exit(0);
}

createAdmin().catch(err => {
  console.error('Erreur lors de la création du compte admin :', err);
  process.exit(1);
}); 