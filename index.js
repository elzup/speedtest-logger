const speedTest = require('speedtest-net')
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/database.db');

const test = speedTest({maxTime: 5000})

test.on('data', data => {
    const up = data.speeds.originalUpload
    const down = data.speeds.originalDownload
    db.run('INSERT INTO log (up, down) VALUES(' + up + ',  ' + down + ')');
})
