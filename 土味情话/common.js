var request = require('sync-request')
var fs = require('fs')
var path=require('path')
var log = console.log.bind(console)

var requestNew = require('request')
const superagent = require('superagent');

var getFun = (url) => {
	// // 用 GET 方法获取 url 链接的内容
	// // 相当于你在浏览器地址栏输入 url 按回车后得到的 HTML 内容
	var r = request('GET', url)
	var body = JSON.parse(r.getBody())
	return body
}
//get发起请求拼接参数
var parment = (result) => {
	var r = []
	for(var key in result) {
		r.push(`${key}=${result[key]}`)
	}
	var res = r.join('&')
	return res
}

//post请求
var postFun = (url, parameter) => {
	var res = request('POST', url, {
		json: parameter,
	});
	var user = JSON.parse(res.getBody('utf8'));
	return user
}
// ----------------------------
//读文件
var readFun = function(cacheFile) {
	var exists = fs.existsSync(cacheFile)
	if (exists) {
		let data =  fs.readFileSync(cacheFile, 'utf-8')
		return JSON.parse(data)
	} else {
		return []
	}
}
//写入文件
var writeFileSyncFun = function(body, cacheFile) {
	body = JSON.stringify(body, null, 2)
	// 写入缓存
	fs.writeFileSync(cacheFile, body)
}

//匹配替换文字
var replaceText = () => {
	var cacheFile = 'test.json'
	fs.readFile(cacheFile, 'utf8', function (err, files) {
		var result = files.replace(/{ "_id"/g, ',{ "_id"');
		fs.writeFile(cacheFile, `[${result.slice(1)}]`, 'utf8', function (err) {
			if (err) return console.log(err);
		});

	})
}

module.exports = {
	getFun,
	postFun,
	parment,
	readFun,
	writeFileSyncFun,
	replaceText,
}