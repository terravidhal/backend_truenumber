jest.setTimeout(20000);
const request = require('supertest');
const app = require('../app');
const User = require('../models/user.model');

let adminToken;
let userId;

beforeAll(async () => {
  await app.startDatabase();
  // Connexion admin pour récupérer un token
  const res = await request(app)
    .post('/api/auth/login')
    .send({
      email: process.env.ADMIN_EMAIL || 'admin@truenumber.com',
      password: process.env.ADMIN_PASSWORD || 'admin123'
    });
  console.log('LOGIN ADMIN:', res.statusCode, res.body);
  adminToken = res.body.token;
});

afterAll(async () => {
  await User.deleteMany({ email: 'usertest@example.com' });
});

describe('User routes', () => {
  it('admin peut créer un utilisateur', async () => {
    const res = await request(app)
      .post('/api/users')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        username: 'usertest',
        email: 'usertest@example.com',
        password: 'motdepasse',
        role: 'client'
      });
    expect(res.statusCode).toBe(201);
    userId = (await User.findOne({ email: 'usertest@example.com' }))._id;
  });

  it('admin peut voir la liste des utilisateurs', async () => {
    const res = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('admin peut voir un utilisateur par id', async () => {
    const res = await request(app)
      .get(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe('usertest@example.com');
  });

  it('admin peut modifier un utilisateur', async () => {
    const res = await request(app)
      .put(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ username: 'usertest2' });
    expect(res.statusCode).toBe(200);
    expect(res.body.user.username).toBe('usertest2');
  });

  it('admin peut supprimer un utilisateur', async () => {
    const res = await request(app)
      .delete(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/supprimé/i);
  });
}); 