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
var downloadCovers = () => {
    // 使用 request 库来下载图片
    var request = require('request')
    var fs = require('fs')
    var len  = 3000
    for (let i = 0; i < len; i++) {
        let url = 'https://static.geon.top/g7/share/g7-101-'+ i +'.png'
        let path = 'covers/' + i + '.png'

        superagent(url, function() {
            request(url).pipe(fs.createWriteStream(path))
        })

        // // 下载并保存图片的套路
        // request(url).pipe(fs.createWriteStream(path))
    }
}

// function validateImage(url, fun) {
//     // 使用 request 库来下载图片
//     var request = require('request')
//     var fs = require('fs')
//     // 使用 request 库来下载图片
//     var request = require('request')
//     request(url, function (error, response, body) {
//         if (!error && response.statusCode == 200) {
//             // console.log(body) // 请求成功的处理逻辑
//             fun()
//             log(111111, body)
//         } else {
//         }
//     });
// }

//判断线上的图片是否存在，有的话，再去设置
var superagent  = function(url, fun) {
        const request1 = require('superagent');
         // let api = 'https://static.geon.top/g7/share/g7-101-726.png'

        request1.get(url)
            .end(function(err, res){
                if(res.statusCode == 200) {
                    fun()
                }
            });
}


var __main = function() {
    // readJson()
    downloadCovers()
}



__main()
