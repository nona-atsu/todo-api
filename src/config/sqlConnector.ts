const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'todo',
    dateStrings: 'date'
});

connection.connect((err: string) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('success');
});

export default connection;