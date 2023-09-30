import express, { Router, Request, Response } from 'express';
import { body, Result, validationResult } from 'express-validator';

const mysql = require('mysql2');

const router: Router = express.Router();
type TODO_TYPE = {
    id: number;
    title: string;
    content: string;
    startDate: Date;
    endDate: Date;
    dueDate: Date;
};

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'todo',
});

connection.connect((err: string) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('success');
});

router.get('/',
    (req: Request, res: Response) => {
    connection.query('SELECT * FROM `todos`', (err: string, results: []) => {
        if (err) {
            console.log(err);
            return;
        }
        res.send(results);
    });
});

router.post('/',
    // Validation Rule
    [
        body('title').isString().isLength({ min: 1, max: 255}).withMessage('Please enter from 1 to 255 characters.'),
        body('content').isString().isLength({ min: 1 }).withMessage('Please enter over 1 characters.'),
        body('startDate').isDate().withMessage('Please enter yyyy-MM-dd'),
        body('endDate').isDate().withMessage('Please enter yyyy-MM-dd.'),
        body('endDate').custom((value, { req }) => {
            const endDate = new Date(value);
            const startDate = new Date(req.body.startDate);
            if (endDate.getTime() <= startDate.getTime()) {
                throw new Error("Please enter date after startDate");
            }
        }),
        body('dueDate').isDate().withMessage('Please enter yyyy-MM-dd.'),
        // body('dueDate').toDate().custom((dueDate, { req }) => {
        //     if (dueDate.getTime() > req.body.startDate.getTime()) {
        //         throw new Error("Please enter date after startDate");
        //     }
        // })
    ],
    (req: Request, res: Response) => {
    // Validation
    const errors: Result = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    connection.query(
        `insert into todos(title, content, start_date, end_date, due_date)
        values ("${req.body.title}", "${req.body.content}", "${req.body.start_date}", "${req.body.end_date}", "${req.body.due_date}")`,
        (err: string, results: []) => {
            if (err) {
                console.log(err);
                return;
            }
            res.send(results);
        }
    );
});

export default router;