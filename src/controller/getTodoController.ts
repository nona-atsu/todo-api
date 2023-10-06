import express, { Router, Request, Response } from 'express';
import connection from '../config/sqlConnector';
import TodoType from '../types/todo';

const router: Router = express.Router();

//get todo by id
router.get('/:id',
    (req: Request, res: Response) => {
    connection.query(`SELECT id, title, content, start_date as startDate, end_date as endDate, due_date as dueDate FROM todos WHERE id=${req.params.id}`, (err: string, results: TodoType[]) => {
        if (err) {
            console.log(err);
            return;
        }
        const response = results.map((todo: TodoType) => {
            return {
                id: todo.id,
                title: todo.title,
                content: todo.content,
                startDate: todo.startDate,
                endDate: todo.endDate,
                dueDate: todo.dueDate,
            };
        });
        res.send(response);
    });
});

export default router;