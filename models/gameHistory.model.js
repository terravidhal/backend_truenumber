const mongoose = require('mongoose');

const gameHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  generatedNumber: { type: Number, required: true },
  result: { type: String, enum: ['gagné', 'perdu'], required: true },
  balanceChange: { type: Number, required: true },
  newBalance: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('GameHistory', gameHistorySchema); 