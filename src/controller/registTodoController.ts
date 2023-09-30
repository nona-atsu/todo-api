import express, { Router, Request, Response } from 'express';
import { body, Result, validationResult } from 'express-validator';
import connection from '../config/sqlConnector';
import Todotype from '../types/todo';

const router: Router = express.Router();

//insert todo
router.post('/',
    // Validation Rule
    [
        body('title').isString().isLength({ min: 1, max: 255}).withMessage('Please enter from 1 to 255 characters.'),
        body('content').isString().isLength({ min: 1 }).withMessage('Please enter over 1 characters.'),
        body('startDate').isISO8601().withMessage('Please enter yyyy-MM-dd'),
        body('endDate').isISO8601().withMessage('Please enter yyyy-MM-dd.'),
        body('endDate').custom((value, { req }) => {
            const endDate = new Date(value);
            const startDate = new Date(req.body.startDate);
            if (endDate.getTime() <= startDate.getTime()) {
                throw new Error("Please enter date after startDate");
            }
            return true;
        }),
        body('dueDate').isISO8601().withMessage('Please enter yyyy-MM-dd.'),
        body('dueDate').custom((value, { req }) => {
            const dueDate = new Date(value);
            const startDate = new Date(req.body.startDate);
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
        `insert into todos(title, content, start_date, end_date, due_date)
        values ("${req.body.title}", "${req.body.content}", "${req.body.startDate}", "${req.body.endDate}", "${req.body.dueDate}")`,
        (err: string, results: Todotype[]) => {
            if (err) {
                console.log(err);
                return;
            }
            res.send(results);
        }
    );
});

export default router;