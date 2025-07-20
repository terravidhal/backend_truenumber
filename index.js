const app = require('./app');
const PORT = process.env.PORT || 5000;

app.startDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
  });
}); 