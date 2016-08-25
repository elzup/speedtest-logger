const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/database.db');

db.run('CREATE TABLE log (id, up, down, created_at)');
db.close();
