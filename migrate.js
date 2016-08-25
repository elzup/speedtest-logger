const sqlite3 = require('sqlite3').verbose();
const path = require('path')
const dbPath = path.resolve(__dirname, 'db', 'database.db')
const db = new sqlite3.Database(dbPath);

const sql = '' +
    'CREATE TABLE logs ('
    + 'id INTEGER PRIMARY KEY AUTOINCREMENT,'
    + 'up INTEGER,'
    + 'down INTEGER,'
    + 'created_at DEFAULT CURRENT_TIMESTAMP)'

db.run(sql);
db.close();
