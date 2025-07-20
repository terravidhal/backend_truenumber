//
// Swagger documentation for User routes
// 

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Infos de l'utilisateur connecté
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Infos utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             examples:
 *               success:
 *                 summary: Succès
 *                 value:
 *                   id: "60c72b2f9b1e8e001c8e4b8a"
 *                   username: "testuser"
 *                   email: "testuser@example.com"
 *                   phone: "0600000000"
 *                   role: "client"
 *                   balance: 100
 *                   createdAt: "2024-06-01T12:00:00.000Z"
 *                   updatedAt: "2024-06-01T12:00:00.000Z"
 *       401:
 *         description: Non authentifié
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               error:
 *                 summary: Non authentifié
 *                 value:
 *                   success: false
 *                   message: "Token manquant"
 *                   error: ""
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Liste de tous les utilisateurs (admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *             examples:
 *               success:
 *                 summary: Succès
 *                 value:
 *                   - id: "60c72b2f9b1e8e001c8e4b8a"
 *                     username: "testuser"
 *                     email: "testuser@example.com"
 *                     phone: "0600000000"
 *                     role: "client"
 *                     balance: 100
 *                     createdAt: "2024-06-01T12:00:00.000Z"
 *                     updatedAt: "2024-06-01T12:00:00.000Z"
 *                   - id: "60c72b2f9b1e8e001c8e4b8b"
 *                     username: "admin"
 *                     email: "admin@example.com"
 *                     phone: "0600000001"
 *                     role: "admin"
 *                     balance: 200
 *                     createdAt: "2024-06-01T12:00:00.000Z"
 *                     updatedAt: "2024-06-01T12:00:00.000Z"
 *       403:
 *         description: Accès refusé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               error:
 *                 summary: Accès refusé
 *                 value:
 *                   success: false
 *                   message: "Accès réservé aux administrateurs."
 *                   error: ""
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Infos d'un utilisateur par ID (admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Infos utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             examples:
 *               success:
 *                 summary: Succès
 *                 value:
 *                   id: "60c72b2f9b1e8e001c8e4b8a"
 *                   username: "testuser"
 *                   email: "testuser@example.com"
 *                   phone: "0600000000"
 *                   role: "client"
 *                   balance: 100
 *                   createdAt: "2024-06-01T12:00:00.000Z"
 *                   updatedAt: "2024-06-01T12:00:00.000Z"
 *       404:
 *         description: Utilisateur non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               error:
 *                 summary: Utilisateur non trouvé
 *                 value:
 *                   success: false
 *                   message: "Utilisateur non trouvé."
 *                   error: ""
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Créer un utilisateur (admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
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
 *               - role
 *             properties:
 *               username:
 *                 type: string
 *                 example: newuser
 *               email:
 *                 type: string
 *                 example: newuser@example.com
 *               password:
 *                 type: string
 *                 example: motdepasse
 *               phone:
 *                 type: string
 *                 example: 0600000002
 *               role:
 *                 type: string
 *                 enum: [client, admin]
 *                 example: client
 *     responses:
 *       201:
 *         description: Utilisateur créé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             examples:
 *               success:
 *                 summary: Succès
 *                 value:
 *                   id: "60c72b2f9b1e8e001c8e4b8c"
 *                   username: "newuser"
 *                   email: "newuser@example.com"
 *                   phone: "0600000002"
 *                   role: "client"
 *                   balance: 0
 *                   createdAt: "2024-06-01T12:00:00.000Z"
 *                   updatedAt: "2024-06-01T12:00:00.000Z"
 *       400:
 *         description: Champs manquants ou utilisateur existant
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               error:
 *                 summary: Utilisateur existant
 *                 value:
 *                   success: false
 *                   message: "Email ou nom d'utilisateur déjà utilisé."
 *                   error: ""
 */

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Modifier un utilisateur (admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: updateduser
 *               email:
 *                 type: string
 *                 example: updateduser@example.com
 *               password:
 *                 type: string
 *                 example: newpassword
 *               phone:
 *                 type: string
 *                 example: 0600000003
 *               role:
 *                 type: string
 *                 enum: [client, admin]
 *                 example: admin
 *     responses:
 *       200:
 *         description: Utilisateur modifié
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             examples:
 *               success:
 *                 summary: Succès
 *                 value:
 *                   id: "60c72b2f9b1e8e001c8e4b8d"
 *                   username: "updateduser"
 *                   email: "updateduser@example.com"
 *                   phone: "0600000003"
 *                   role: "admin"
 *                   balance: 0
 *                   createdAt: "2024-06-01T12:00:00.000Z"
 *                   updatedAt: "2024-06-02T12:00:00.000Z"
 *       404:
 *         description: Utilisateur non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               error:
 *                 summary: Utilisateur non trouvé
 *                 value:
 *                   success: false
 *                   message: "Utilisateur non trouvé."
 *                   error: ""
 */

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur (admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur supprimé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Utilisateur supprimé avec succès.
 *       404:
 *         description: Utilisateur non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               error:
 *                 summary: Utilisateur non trouvé
 *                 value:
 *                   success: false
 *                   message: "Utilisateur non trouvé."
 *                   error: ""
 */ 