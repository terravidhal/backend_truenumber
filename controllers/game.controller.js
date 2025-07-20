const User = require('../models/user.model');
const GameHistory = require('../models/gameHistory.model');
const { GAME } = require('../config/constants.config');
const generateRandomNumber = require('../utils/generateRandomNumber.utils');

exports.play = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });

    // Générer un nombre aléatoire entre MIN_NUMBER et MAX_NUMBER
    const generatedNumber = generateRandomNumber(GAME.MIN_NUMBER, GAME.MAX_NUMBER);
    // Pour l'exemple, on considère que gagner = nombre pair, perdre = impair
    const isWin = generatedNumber % 2 === 0;
    const result = isWin ? 'gagné' : 'perdu';
    const balanceChange = isWin ? GAME.WIN_AMOUNT : GAME.LOSE_AMOUNT;
    const newBalance = user.balance + balanceChange;

    // Mettre à jour le solde
    user.balance = newBalance;
    await user.save();

    // Enregistrer l'historique
    const history = new GameHistory({
      userId: user._id,
      generatedNumber,
      result,
      balanceChange,
      newBalance
    });
    await history.save();

    res.json({
      message: `Vous avez ${result} !`,
      generatedNumber,
      balanceChange,
      newBalance
    });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

exports.getBalance = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    res.json({ balance: user.balance });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const history = await GameHistory.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

exports.getAllHistory = async (req, res) => {
  try {
    const history = await GameHistory.find().populate('userId', 'username email').sort({ createdAt: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
}; 