// 爬取最美祝福的文案
var request = require('sync-request')
var fs = require('fs')
var path=require('path')
var log = console.log.bind(console)
//引入md5文件
var md5 = require('./md5.js')

var getFun = (url) => {
    // // 用 GET 方法获取 url 链接的内容
    // // 相当于你在浏览器地址栏输入 url 按回车后得到的 HTML 内容
    var r = request('GET', url)
    var body = JSON.parse(r.getBody())
    return body
}
var readFun = function(cacheFile) {
    var exists = fs.existsSync(cacheFile)
    if (exists) {
        let data =  fs.readFileSync(cacheFile, 'utf-8')
        return JSON.parse(data)
    } else {
       return []
    }
}
var writeFileSyncFun = function(body, cacheFile) {
    body = JSON.stringify(body, null, 2)
    // body = JSON.stringify(body)
    // 写入缓存
    fs.writeFileSync(cacheFile, body)
}

//发起请求
var parment = (result) => {
    var r = []
    for(var key in result) {
        r.push(`${key}=${result[key]}`)
    }
    var res = r.join('&')
    return res
}
var requestContent = (user_id) => {
    // var user_id = '10616019'
    user_id += ''
    var appSign = 'T1qgjvr2Fm'
    var s = new Date().getTime(), r = "timestamp:" + s + "user_id:" + user_id + appSign;
    var result = {
        user_id: user_id,
        sign: md5.md5(r),
        timestamp: s
    }
    var url = 'https://hz.zxmn2018.com/xsc/api/v1_0_4/challenge/start?' + parment(result)
    var r = getFun(url)

    var cacheFile = 'content.json'
    if(r.data.status == 1) {
        var words = r.data.words
        var data = readFun(cacheFile)
        log(33333, data, typeof data)
        log(44444, typeof words)
        var data1 = data.push(words)
        log(99999, data)
        writeFileSyncFun(data, cacheFile)
    }
}

var __main = function() {
    var len = readFun('content.json').length
    // var data = readFun('content.json').slice(0, 1800)
    // writeFileSyncFun(data, 'content1.json')
    log(2222, len)
    // for(var i = 0; i < 1000; i++) {
    //     requestContent(i)
    // }
}
__main()
