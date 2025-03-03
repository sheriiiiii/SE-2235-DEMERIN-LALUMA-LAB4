const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

let todos = [];

app.get('/', (req, res) => {
    res.send('Just backend.. =)');
});

app.get('/todos', (req, res) => {
    // for data down the terminal
    // console.log('GET /todos request received');
    res.json(todos);
});

app.post('/todos', (req, res) => {
    // for data down the terminal
    // console.log('POST /todos request received with data:', req.body);
    const newTodo = {
        id: Date.now(),
        text: req.body.text,
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

app.delete('/todos/:id', (req, res) => {
    // for data down the terminal
    // console.log('DELETE /todos/:id request received with id:', req.params.id);
    const id = parseInt(req.params.id);
    todos = todos.filter((todo) => todo.id !== id);
    res.sendStatus(204);
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});