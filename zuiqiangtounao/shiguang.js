// 爬取最美祝福的文案
var request = require('sync-request')
var fs = require('fs')
var path=require('path')
var log = console.log.bind(console)

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
        log(888, JSON.parse(data))
        return JSON.parse(data)
    } else {
       return []
    }
}
var writeFileSyncFun = function(body, cacheFile) {
    // body = JSON.stringify(body, null, 2)
    body = JSON.stringify(body)
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

//简化json文件
var reduce = () => {
    var cacheFile = 'test.json'
    var data = readFun(cacheFile)
    var result = []
    data.map((item) => {
        var r = {}
        r.type = item.type
        r.explain = item.options
        r.answer = item.answer
        r.question = item.quiz
        r.level = result.length+1

        if(result.length < 900) {
            result.push(r)
        }
    })
    writeFileSyncFun(result, 'content.json')
}

var __main = function() {
    // replaceText('test')
    reduce()
}
__main()
