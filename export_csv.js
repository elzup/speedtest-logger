'use strict'
const sqlite3 = require('sqlite3').verbose()
const path = require('path')
const dbPath = path.resolve(__dirname, 'db', 'database.db')
const format = require('date-format')

const db = new sqlite3.Database(dbPath)

db.all("SELECT * FROM logs", (err, rows) => {
	const logs = rows.map(row => {
		const createdAt = new Date(row.created_at)
		const gmtMill = createdAt.getTime()
		// jst's gmt to jst
		const time = format.asString(format.ISO8601_FORMAT, createdAt)
		const upMbps = row.up * 8 / 1000000
		const downMbps = row.down * 8 / 1000000
		const jstMill = gmtMill + 9 * 60 * 60 * 1000
		const timeJST = format.asString(format.ISO8601_FORMAT, new Date(jstMill))
		return [
			row.id,
			time,
			timeJST,
			upMbps,
			downMbps,
			row.down,
			row.up,
		]
	})
	// csv header
	console.log("id,time,timeJST,upMbps,downMbps,down,up")
	// csv datas
	console.log(logs.map(row => row.join(',')).join("\n"))
})
db.close()
