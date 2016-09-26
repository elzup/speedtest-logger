//
// export_json.js の結果を res.json として読み込み
// 時間毎に normalize する
//

var data = require('./res.json');
var moment = require('moment-timezone');

// console.log(data.length);
// console.log(data[0]['upMbps']);
var res = {};
var resDown = {};

for (var i = 0; i < data.length; ++i) {
	var dayKey = moment(new Date(data[i]['created_at'] + ".000Z")).format('YYYY/MM/DD HH:00:00');
	if (!(dayKey in res)) {
		res[dayKey] = [];
		resDown[dayKey] = [];
	}
	res[dayKey].push(data[i]['upMbps']);
	resDown[dayKey].push(data[i]['downMbps']);
}

var keys = Object.keys(res);
for (var i = 0; i < keys.length; ++i) {
	var dateKey = keys[i];
	var sum = res[dateKey].reduce((a, b) => a + b, 0);
	var sum2 = resDown[dateKey].reduce((a, b) => a + b, 0);
	var upRes = sum / res[dateKey].length;
	var downRes = sum2 / resDown[dateKey].length;
	console.log(dateKey + "	" + upRes + "	" + downRes);
}

/*
{ id: 1,
  up: 2013973,
  down: 773442,
  created_at: '2016-08-26 06:24:02',
  upMbps: 16.111784,
  downMbps: 6.187536,
  timeJST: '2016-08-26T15:24:02.000Z' }
*/
