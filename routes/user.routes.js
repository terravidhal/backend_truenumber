const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const userController = require('../controllers/user.controller');
const auth = require('../middlewares/auth.middleware');
const admin = require('../middlewares/admin.middleware');
const validate = require('../middlewares/validate.middleware');

router.get('/me', auth, userController.getMe);

router.get('/', auth, admin, userController.getAll);

router.get('/stats', auth, admin, userController.getStats);

router.get('/registration-trend', auth, admin, userController.getRegistrationTrend);

router.get('/:id', auth, admin, userController.getById);

router.post('/', [
  auth,
  admin,
  body('username').notEmpty().withMessage('Le nom d\'utilisateur est requis.'),
  body('email').isEmail().withMessage('Email invalide.'),
  body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères.'),
  body('role').isIn(['client', 'admin']).withMessage('Le rôle doit être client ou admin.'),
  validate
], userController.create);

router.put('/:id', [
  auth,
  admin,
  body('username').optional().notEmpty().withMessage('Le nom d\'utilisateur ne peut pas être vide.'),
  body('email').optional().isEmail().withMessage('Email invalide.'),
  body('password').optional().isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères.'),
  body('role').optional().isIn(['client', 'admin']).withMessage('Le rôle doit être client ou admin.'),
  validate
], userController.update);

router.delete('/:id', auth, admin, userController.delete);

module.exports = router; 