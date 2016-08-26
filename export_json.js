const sqlite3 = require('sqlite3').verbose()
const path = require('path')
const dbPath = path.resolve(__dirname, 'db', 'database.db')

const db = new sqlite3.Database(dbPath)

db.all("SELECT * FROM logs", (err, rows) => {
	const logs = rows.map((row) => {
		const gmtMill = new Date(row.created_at).getTime()
		// jst's gmt to jst
		const jstMill = gmtMill + 9 * 60 * 60 * 1000 * 2
		row.upMbps = row.up * 8 / 1000000
		row.downMbps = row.down * 8 / 1000000
		row.timeJST = new Date(jstMill)
		return row
	})
	console.log(logs)
})
db.close()
