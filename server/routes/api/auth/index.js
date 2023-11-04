// routes/auth.js
const jwt = require('jsonwebtoken');
const { DB } = require('../../../config/environment');
const User = require('../../../models').User;

fastify.post('/register', async (request, reply) => {
  try {
    const { username, email, password } = request.body;
    const user = await User.create({ username, email, password });
    reply.send(user);
  } catch (error) {
    reply.status(500).send({ error: 'Registration failed.' });
  }
});

fastify.post('/login', async (request, reply) => {
  const { email, password } = request.body;
  const user = await User.findOne({ where: { email } });

  if (!user) {
    reply.status(401).send({ error: 'User not found' });
    return;
  }

  if (user.password !== password) {
    reply.status(401).send({ error: 'Incorrect password' });
    return;
  }

  // Generate a token for authentication
  const token = jwt.sign({ userId: user.id }, DB.AUTHENTICATION.jwtSecret, {
    expiresIn: '1h',
  });

  reply.send({ token });
});