import express, { Router, Request, Response } from 'express';
import { body, Result, validationResult } from 'express-validator';
import connection from '../config/sqlConnector';
import TodoType from '../types/todo';

const router: Router = express.Router();

//update todo
router.put('/:id',
    // Validation Rule
    [
        body('title').isString().isLength({ min: 1, max: 255}).withMessage('Please enter from 1 to 255 characters.'),
        body('content').isString().isLength({ min: 1 }).withMessage('Please enter over 1 characters.'),
        body('startDate').isISO8601().withMessage('Please enter yyyy-MM-dd'),
        body('endDate').isISO8601().withMessage('Please enter yyyy-MM-dd.'),
        body('endDate').custom((value, { req }) => {
            const endDate = new Date(value);
            let startDate = req.body.startDate === null ? new Date() : new Date(req.body.startDate);
            connection.query(`SELECT start_date as startDate FROM todos WHERE id=${req.body.id}`, (err: string, results: TodoType[]) => {
                if (err) {
                    console.log(err);
                    return;
                }
                startDate = new Date(results[0].startDate);
            });
            if (endDate.getTime() <= startDate.getTime()) {
                throw new Error("Please enter date after startDate");
            }
            return true;
        }),
        body('dueDate').isISO8601().withMessage('Please enter yyyy-MM-dd.'),
        body('dueDate').custom((value, { req }) => {
            const dueDate = new Date(value);
            let startDate = req.body.startDate === null ? new Date() : new Date(req.body.startDate);
            connection.query(`SELECT start_date as startDate FROM todos WHERE id=${req.body.id}`, (err: string, results: TodoType[]) => {
                if (err) {
                    console.log(err);
                    return;
                }
                startDate = new Date(results[0].startDate);
            });
            if (dueDate.getTime() <= startDate.getTime()) {
                throw new Error("Please enter date after startDate");
            }
            return true;
        })
    ],
    (req: Request, res: Response) => {
    // Validation
    const errors: Result = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    connection.query(
        `update todos set title="${req.body.title}", content="${req.body.content}", start_date="${req.body.startDate}", end_date="${req.body.endDate}", due_date="${req.body.dueDate}" where id=${req.params.id}`,
        (err: string, results: TodoType[]) => {
            if (err) {
                console.log(err);
                return;
            }
            res.send(results);
        }
    );
});

export default router;