jest.setTimeout(20000);
const request = require('supertest');
const app = require('../app');
const User = require('../models/user.model');
const GameHistory = require('../models/gameHistory.model');

let userToken;

beforeAll(async () => {
  await app.startDatabase();
  // Créer un utilisateur et récupérer un token
  await User.deleteMany({ email: 'gameuser@example.com' });
  await request(app)
    .post('/api/auth/register')
    .send({
      username: 'gameuser',
      email: 'gameuser@example.com',
      password: 'motdepasse',
      phone: '0600000000'
    });
  const res = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'gameuser@example.com',
      password: 'motdepasse'
    });
  userToken = res.body.token;
});

afterAll(async () => {
  await GameHistory.deleteMany({});
  await User.deleteMany({ email: 'gameuser@example.com' });
});

describe('Game routes', () => {
  it('joueur peut jouer au jeu', async () => {
    const res = await request(app)
      .post('/api/game/play')
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('generatedNumber');
    expect(res.body).toHaveProperty('newBalance');
  });

  it('joueur peut voir son solde', async () => {
    const res = await request(app)
      .get('/api/game/balance')
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('balance');
  });

  it('joueur peut voir son historique', async () => {
    const res = await request(app)
      .get('/api/game/history')
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
}); 