const fastify = require('fastify');
const cors = require('@fastify/cors');
const db = require('./models');
const { APP_PORT } = require('./config/environment');

const app = fastify({ logger: true });

//require('./routes')(app);

app.register(require('./routes/api'), { prefix: '/api/v1' });
app.register(cors, {
    origin: true
});

db.sequelize.sync();
// db.sequelize.sync({ force: true }); // remove force later

//hooks
app.addHook('onClose', (instance, done) => {
    db.sequelize.close(() => instance.log.info('Sequelize Instance Destroyed.'));
})

app.listen({ port: APP_PORT }, function (err, address) {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
    app.log.info(`server listening on ${address}`);

    process.on('SIGINT', () => app.close());
    process.on('SIGTERM', () => app.close());
});