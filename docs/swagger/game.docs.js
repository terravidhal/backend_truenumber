//
// Swagger documentation for Game routes
//

/**
 * @swagger
 * /api/game/play:
 *   post:
 *     summary: Jouer au jeu TrueNumber
 *     tags: [Game]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Résultat du jeu et nouveau solde
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Vous avez gagné !
 *                 generatedNumber:
 *                   type: number
 *                   example: 42
 *                 balanceChange:
 *                   type: number
 *                   example: 50
 *                 newBalance:
 *                   type: number
 *                   example: 150
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
 * /api/game/balance:
 *   get:
 *     summary: Obtenir le solde de l'utilisateur connecté
 *     tags: [Game]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Solde actuel
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 balance:
 *                   type: number
 *                   example: 150
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
 * /api/game/history:
 *   get:
 *     summary: Historique des parties de l'utilisateur connecté
 *     tags: [Game]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste de parties
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GameHistory'
 *             examples:
 *               success:
 *                 summary: Succès
 *                 value:
 *                   - id: "60c72b2f9b1e8e001c8e4b8e"
 *                     userId: "60c72b2f9b1e8e001c8e4b8a"
 *                     generatedNumber: 42
 *                     result: "gagné"
 *                     balanceChange: 50
 *                     newBalance: 150
 *                     createdAt: "2024-06-01T12:00:00.000Z"
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
 * /api/game/history/all:
 *   get:
 *     summary: Historique de toutes les parties (admin)
 *     tags: [Game]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste de toutes les parties
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GameHistory'
 *             examples:
 *               success:
 *                 summary: Succès
 *                 value:
 *                   - id: "60c72b2f9b1e8e001c8e4b8e"
 *                     userId: "60c72b2f9b1e8e001c8e4b8a"
 *                     generatedNumber: 42
 *                     result: "gagné"
 *                     balanceChange: 50
 *                     newBalance: 150
 *                     createdAt: "2024-06-01T12:00:00.000Z"
 *                   - id: "60c72b2f9b1e8e001c8e4b8f"
 *                     userId: "60c72b2f9b1e8e001c8e4b8b"
 *                     generatedNumber: 17
 *                     result: "perdu"
 *                     balanceChange: -35
 *                     newBalance: 65
 *                     createdAt: "2024-06-01T12:05:00.000Z"
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