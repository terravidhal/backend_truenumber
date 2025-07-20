//
// Swagger documentation for Auth routes
// 

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Champs manquants ou utilisateur existant
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Authentifier un utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: testuser@example.com
 *               password:
 *                 type: string
 *                 example: motdepasse
 *     responses:
 *       200:
 *         description: Connexion réussie, retourne un token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *             examples:
 *               success:
 *                 summary: Succès
 *                 value:
 *                   token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                   user:
 *                     id: "60c72b2f9b1e8e001c8e4b8a"
 *                     username: "testuser"
 *                     email: "testuser@example.com"
 *                     phone: "0600000000"
 *                     role: "client"
 *                     balance: 100
 *                     createdAt: "2024-06-01T12:00:00.000Z"
 *                     updatedAt: "2024-06-01T12:00:00.000Z"
 *       400:
 *         description: Identifiants invalides
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               error:
 *                 summary: Erreur d'identifiants
 *                 value:
 *                   success: false
 *                   message: "Identifiants invalides."
 *                   error: ""
 */

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Déconnexion de l'utilisateur
 *     tags: [Auth]
 *     description: >
 *       Invalide le token JWT côté serveur (blacklist). Après appel, le token ne peut plus être utilisé pour accéder aux routes protégées, même s'il n'est pas expiré.
 *       Le client doit aussi supprimer le token côté client.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Déconnexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Déconnexion réussie.
 *       401:
 *         description: Token manquant ou déjà invalidé
 */ 