jest.setTimeout(20000);
const request = require('supertest');
const app = require('../app');
const User = require('../models/user.model');

beforeAll(async () => {
  await app.startDatabase();
});


afterAll(async () => {
  await User.deleteMany({ email: 'testuser@example.com' });
});

describe('POST /api/auth/register', () => {
  it('doit créer un nouvel utilisateur', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser2',
        email: 'testuser@example.com',
        password: 'motdepasse',
        phone: '0600000000'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toMatch(/succès/i);
  });
});

describe('POST /api/auth/login', () => {
  it('doit connecter un utilisateur existant et retourner un token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'motdepasse'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe('testuser@example.com');
  });
});

describe('POST /api/auth/logout', () => {
  it('doit invalider le token après déconnexion', async () => {
    // Connexion pour obtenir un token
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'motdepasse'
      });
    const token = loginRes.body.token;
    expect(token).toBeDefined();

    // Logout
    const logoutRes = await request(app)
      .post('/api/auth/logout')
      .set('Authorization', `Bearer ${token}`);
    expect(logoutRes.statusCode).toBe(200);
    expect(logoutRes.body.message).toMatch(/déconnexion/i);

    // Tentative d'accès à une route protégée avec le même token (doit échouer)
    const protectedRes = await request(app)
      .get('/api/users/me')
      .set('Authorization', `Bearer ${token}`);
    expect(protectedRes.statusCode).toBe(401);
    expect(protectedRes.body.message).toMatch(/invalidé|logout|token/i);
  });
}); 
