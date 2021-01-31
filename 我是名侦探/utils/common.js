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

//根据不同的header去设置不同参数
var diffOptions = (parameter, obj) => {
	var type = obj.type || 'json'
	var res = {
		json: {
			json: parameter,
		},
		form: {
			headers: {
				// "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
				// 'Cookie': obj.Cookie || '',
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: typeof parameter == 'string' ? parameter : parment(parameter), //转成字符串的形式
		}
	}
	log(8888, res[type])
	return res[type]
}
//post请求
var postFun = (url, parameter = {}, obj = {}) => {
	//判断根据不同的header去设置参数
	var res = request('POST', url, diffOptions(parameter, obj))
	var user = JSON.parse(res.getBody('utf8'));
	return user
}
// ----------------------------
//读文件
var readFun = function(cacheFile) {
	var exists = fs.existsSync(cacheFile)
	if (exists) {
		let data =  fs.readFileSync(cacheFile, 'utf-8')
		if(data) {
			return JSON.parse(data)
		}
		return []
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
//先判断是否有文件夹，没有的话先写入
var creatFile = (cacheFile) => {
	var exists = fs.existsSync(cacheFile)
	if (!exists) {
		fs.mkdirSync(cacheFile);
	}
}

module.exports = {
	getFun,
	postFun,
	parment,
	readFun,
	writeFileSyncFun,
	replaceText,
	creatFile,
}
