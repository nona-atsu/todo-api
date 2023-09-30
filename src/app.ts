import express from 'express';
import todoController from './controller/todo-controller'

const app = express();
const port = 3000;

//curl post
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Root route
app.use('/', todoController);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});