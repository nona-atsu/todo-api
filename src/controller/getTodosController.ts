import express, { Router, Request, Response } from 'express';
import connection from '../config/sqlConnector';
import TodoType from '../types/todo';

const router: Router = express.Router();

//get all todos
router.get('/',
    (req: Request, res: Response) => {
    connection.query('SELECT * FROM `todos` ORDER BY ID', (err: string, results: TodoType[]) => {
        if (err) {
            console.log(err);
            return;
        }
        res.send(results);
    });
});

//get todos with params
router.get('/params',
    (req: Request, res: Response) => {
    connection.query(`SELECT * FROM todos WHERE title LIKE '%${req.query.title}%'`, (err: string, results: TodoType[]) => {
        if (err) {
            console.log(err);
            return;
        }
        res.send(results);
    });
});

export default router;