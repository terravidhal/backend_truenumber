const PORT = process.env.PORT || 5000;

module.exports = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TrueNumber API',
      version: '1.0.0',
      description: "Documentation de l'API TrueNumber",
    },
    servers: [
     // { url: 'http://localhost:' + PORT } // pour preciser
      { url: '/' } // utilse automatiqment l'URL sur laquelle le serveur est lancé, aide lorsqu'on deploi en prod
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '60c72b2f9b1e8e001c8e4b8a' },
            username: { type: 'string', example: 'testuser' },
            email: { type: 'string', example: 'testuser@example.com' },
            phone: { type: 'string', example: '0600000000' },
            role: { type: 'string', enum: ['client', 'admin'], example: 'client' },
            balance: { type: 'number', example: 100 },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        GameHistory: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '60c72b2f9b1e8e001c8e4b8b' },
            userId: { type: 'string', example: '60c72b2f9b1e8e001c8e4b8a' },
            generatedNumber: { type: 'number', example: 42 },
            result: { type: 'string', enum: ['gagné', 'perdu'], example: 'gagné' },
            balanceChange: { type: 'number', example: 50 },
            newBalance: { type: 'number', example: 150 },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        AuthResponse: {
          type: 'object',
          properties: {
            token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
            user: { $ref: '#/components/schemas/User' }
          }
        },
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Erreur serveur' },
            error: { type: 'string', example: 'Stack trace ou message détaillé' }
          }
        }
      }
    },
    security: [
      { bearerAuth: [] }
    ]
  },
  apis: ['./routes/*.js', './docs/swagger/*.js'],
}; 