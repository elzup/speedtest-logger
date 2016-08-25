const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/database.db');

const sql = '' +
    'CREATE TABLE logs ('
    + 'id INTEGER PRIMARY KEY AUTOINCREMENT,'
    + 'up INTEGER,'
    + 'down INTEGER,'
    + 'created_at DEFAULT CURRENT_TIMESTAMP)'

db.run(sql);
db.close();
