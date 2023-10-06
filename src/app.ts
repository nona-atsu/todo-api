import express from 'express';
import getTodoController from './controller/getTodoController';
import getTodosController from './controller/getTodosController';
import createTodoController from './controller/createTodoController';
import updateTodoController from './controller/updateTodoController';
import deleteTodoController from './controller/deleteTodoController';

const app = express();
const port = 3000;

//curl post
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Root route
app.use('/', getTodoController);
app.use('/', getTodosController);
app.use('/', createTodoController);
app.use('/', updateTodoController);
app.use('/', deleteTodoController);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});