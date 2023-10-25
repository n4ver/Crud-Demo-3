const Todo = require('../../../models').Todo;

async function routes(fastify, options) {
    //create
    fastify.post('/', async (req, res) => {
        const { body } = req;
        const todo = Todo.create({
            id: body.id,
            title: body.title,
            isDone: body.isDone,
            content: body.content
        });
    }),
    //get all
    fastify.get('/', async (req, res) => {
        const todo = await Todo.findAll();
        return res.send({ todo });
    }),
    //get one
    fastify.get('/:id', async (req, res) => {
        const { id } = req.params;
        const todo = await Todo.findByPk(id);
        return res.send({ todo });
    }),
    //edit one
    fastify.put('/edit/:id', async (req, res) => {
        const { id } = req.params;
        const { body } = req;
        console.log(body);
        Todo.update({
            title: body.title._value,
            content: body.content._value,
            isDone: body.isDone._value
        },
        {
            where: {
                id: id
            }
        });
        }
    )    
    //delete one
    fastify.delete('/delete/:id', async (req, res) => {
        const { id } = req.params;
        const todo = await Todo.destroy({
            where: {
                id: id
            }
        });
    })
}

module.exports = routes