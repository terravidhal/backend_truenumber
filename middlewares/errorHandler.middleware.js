module.exports = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Erreur serveur',
    error: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });
}; 