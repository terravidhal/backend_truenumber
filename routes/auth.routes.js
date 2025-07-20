const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const validate = require('../middlewares/validate.middleware');
const extractToken = require('../middlewares/extractToken.middleware');


router.post('/register', [
  body('username').notEmpty().withMessage('Le nom d\'utilisateur est requis.'),
  body('email').isEmail().withMessage('Email invalide.'),
  body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères.'),
  validate
], authController.register);

router.post('/login', [
  body('email').isEmail().withMessage('Email invalide.'),
  body('password').notEmpty().withMessage('Le mot de passe est requis.'),
  validate
], authController.login);

router.post('/logout', extractToken, authController.logout);

module.exports = router; 