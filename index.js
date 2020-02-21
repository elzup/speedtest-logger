'use strict'
const speedTest = require('speedtest-net')
const sqlite3 = require('sqlite3').verbose()
const path = require('path')
const dbPath = path.resolve(__dirname, 'db', 'database.db')

speedTest().then(data => {
	const db = new sqlite3.Database(dbPath)
	const up = data.speeds.originalUpload
	const down = data.speeds.originalDownload
	const sql = `INSERT INTO logs (up, down) VALUES(${up},  ${down})`
	db.run(sql)
	db.close()
})
