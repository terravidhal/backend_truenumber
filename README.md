# TrueNumber – Backend

Ce backend Express/MongoDB gère l'API du jeu TrueNumber (authentification, jeu, gestion utilisateurs/admin, historique, etc.).

## Prérequis
- Node.js >= 16
- MongoDB (local ou cloud)

## Installation
1. Clone le repo et place-toi dans le dossier du projet :
   ```bash
   git clone <repo_url>
   cd <nom_du_dossier>
   ```
2. Installe les dépendances :
   ```bash
   npm install
   ```
3. Crée un fichier `.env` à la racine (voir `.env.example`) :
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/nom_database
   JWT_SECRET=yoursupersecretkey
   JWT_EXPIRES_IN=7d
   ADMIN_EMAIL=adminapp@truenumber.com
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=admin455
   # NODE_ENV=development
   ```

## Démarrage du serveur
```bash
npm start
```
Le serveur démarre sur `http://localhost:5000` (ou le port défini dans `.env`).

## Création automatique du compte admin
- À chaque démarrage, le backend crée un compte admin par défaut si besoin (voir variables dans `.env`).
- Pour forcer la création manuelle, tu peux aussi lancer :
  ```bash
  npm run admin-seeder
  ```

## Documentation de l'API (Swagger)
- Accède à la doc interactive :
  - En local : [http://localhost:5000/api-docs](http://localhost:5000/api-docs)
  - En production (ex : Render) : [https://<ton-app>.onrender.com/api-docs](https://<ton-app>.onrender.com/api-docs)
- Swagger UI détecte automatiquement l'URL du serveur, que ce soit en local ou en production.
- Toutes les routes principales sont documentées (auth, users, game).

## Comment tester ta documentation Swagger

1. **Lancer le serveur localement**
   ```bash
   npm start
   ```
   ou
   ```bash
   node index.js
   ```

2. **Accéder à Swagger UI**
   - Ouvre [http://localhost:5000/api-docs](http://localhost:5000/api-docs) en local dans ton navigateur.
   
   -ou en production(ex sur render) [https://<ton-app>.onrender.com/api-docs](https://<ton-app>.onrender.com/api-docs)

3. **Tester les routes publiques**
   - Par exemple, `POST /api/auth/register` ou `POST /api/auth/login`.
   - Clique sur la route, puis sur "Try it out".
   - Renseigne les champs du body (utilise les exemples fournis).
   - Clique sur "Execute" pour voir la réponse.

4. **Tester les routes protégées**
   - **Étape 1** : Connecte-toi via `POST /api/auth/login` pour obtenir un token JWT.
   - **Étape 2** : Clique sur le bouton "Authorize" en haut à droite de Swagger UI.
     - Entre :
       ```
       Bearer <ton_token>
       ```
       (ou juste le token, selon la config Swagger)
   - **Étape 3** : Teste les routes protégées (`/api/users/me`, `/api/game/play`, etc.) en cliquant sur "Try it out" puis "Execute".

5. **Vérifier les réponses**
   - Les réponses doivent correspondre aux exemples et schémas définis dans la doc.
   - Les erreurs (ex: mauvais token, accès admin, etc.) doivent aussi s'afficher comme prévu.

**Conseils**
- Si tu modifies la doc Swagger, pense à recharger la page `/api-docs` (Ctrl+F5).
- Tu peux copier-coller les exemples de body directement depuis Swagger.
- Si tu veux tester des cas d'erreur, essaie d'appeler une route protégée sans token, ou avec un mauvais token.

**En cas de problème**
- Si Swagger UI ne propose pas le bouton "Authorize", vérifie bien la section `securitySchemes` dans `config/swagger.js`.
- Si les exemples ne s'affichent pas, vérifie l'indentation et la syntaxe YAML dans les commentaires Swagger.

---

## Tests automatisés

Ce projet inclut des **tests d'intégration** : ils vérifient le bon fonctionnement des routes API, des contrôleurs et de la base de données en simulant de vraies requêtes HTTP (via Supertest).

- Les tests couvrent l'authentification, la gestion des utilisateurs et la logique de jeu.
- Pour lancer tous les tests :
  ```bash
  npm test
  ```
- Les tests utilisent la base définie dans `MONGO_URI` (prévois une base dédiée pour les tests si besoin).
- Les tests sont situés dans le dossier `tests/` et sont exécutés automatiquement avec Jest.

**Exemples de tests réalisés :**
- `POST /api/auth/register` crée un utilisateur en base et vérifie la réponse.
- `POST /api/auth/login` vérifie la connexion et le retour du token.
- `POST /api/game/play` simule une partie et vérifie le résultat.
- `GET /api/users` vérifie la récupération de tous les utilisateurs.

## Structure du projet
```
├── config/            # Fichiers de configuration centralisés (database.config.js, jwt.config.js, swagger.config.js, constants.config.js)
├── utils/             # Fonctions utilitaires réutilisables (generateRandomNumber.utils.js)
├── app.js              # App Express principale (middlewares, routes, MongoDB)
├── index.js            # Point d'entrée (lance le serveur)
├── models/             # Modèles Mongoose (user.model.js, gameHistory.model.js)
├── controllers/        # Logique métier (auth.controller.js, user.controller.js, game.controller.js)
├── routes/             # Définition des routes Express (auth.routes.js, user.routes.js, game.routes.js)
├── middlewares/        # Middlewares (auth.middleware.js, admin.middleware.js, validate.middleware.js, errorHandler.middleware.js)
├── tests/              # Tests Jest/Supertest
├── admin-seeder.js     # Script de seed admin
├── .env.example        # Exemple de config d'environnement
├── README.md           # Ce fichier
```
## Commandes utiles
- `npm start` : démarre le serveur
- `npm run admin-seeder` : crée le compte admin par défaut
- `npm test` : lance tous les tests automatisés

---

**Pour toute question ou contribution, ouvre une issue ou une pull request !**


