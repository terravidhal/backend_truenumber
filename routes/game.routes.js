const express = require('express');
const router = express.Router();
const gameController = require('../controllers/game.controller');
const auth = require('../middlewares/auth.middleware');
const admin = require('../middlewares/admin.middleware');

router.post('/play', auth, gameController.play);

router.get('/balance', auth, gameController.getBalance);

router.get('/history', auth, gameController.getHistory);

router.get('/history/all', auth, admin, gameController.getAllHistory);

module.exports = router; 