const apiRoutes = async (app, options) => {
    app.register(require('./todo'), { prefix: 'todo' });
    app.get('/', async (req, rep) => {
        return { hello: 'world' };
    });
};

module.exports = apiRoutes;