import express, { Router, Request, Response } from 'express';
import connection from '../config/sqlConnector';
import TodoType from '../types/todo';

const router: Router = express.Router();

//get todo by id
router.get('/:id',
    (req: Request, res: Response) => {
    connection.query(`SELECT * FROM todos WHERE id=${req.params.id}`, (err: string, results: TodoType[]) => {
        if (err) {
            console.log(err);
            return;
        }
        res.send(results);
    });
});

export default router;