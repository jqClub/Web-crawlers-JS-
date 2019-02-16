// 下载json文件图片
var request = require('sync-request')

var log = console.log.bind(console)

//1.读取json文件内容
//2.循环去下载图片信息，并保存在本地
var readJson = url => {
    //这里可能会读取的是乱码，所以需要重新以UTF-8 无BOM编码保存json文件
    // var cacheFile = 'cached_html/' + 'chengyu.json'
    var cacheFile = 'chengyu.json'
    var fs=require('fs')
    fs.readFile(cacheFile,'utf8',function (err, data) {
        if(err) console.log(err);
        var test1=JSON.parse(data);//读取的值

        //下载图片地址
        downloadCovers(test1.WordMap)
    });
}
var downloadCovers = movies => {
    // 使用 request 库来下载图片
    var request = require('request')
    var fs = require('fs')
    var len = movies.length
    for (var i = 0; i < len; i++) {
        var m = movies[i]
        // // 保存图片的路径
        var url = 'https://static.bcxgame.com/awy/upload/Main/' +  m.question
        // var path = 'covers/' + m.level + m.answer + '.png'
        var path = 'covers/' + m.question
        log(path)
        // 下载并保存图片的套路
        request(url).pipe(fs.createWriteStream(path))
    }
}

var __main = function() {
    readJson()
}

__main()
