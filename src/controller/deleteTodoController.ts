import express, { Router, Request, Response } from 'express';
import connection from '../config/sqlConnector';
import TodoType from '../types/todo';

const router: Router = express.Router();

//delete todo
router.delete('/:id',
    (req: Request, res: Response) => {
    connection.query(`delete from todos where id=${req.params.id}`, (err: string, results: TodoType[]) => {
        if (err) {
            console.log(err);
            return;
        }
        res.send(results);
    });
});

export default router;