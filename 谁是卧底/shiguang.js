// 爬取最美祝福的文案
var request = require('sync-request')
var fs = require('fs')
var path=require('path')
var url = require('url')

var common = require('./utils/common.js')
var pictureDownloader = require('./utils/pictureDownloader')

var log = console.log.bind(console)

//1.请求列表数据
var requestList = () => {
    var list = []
    var url = 'https://www.bigmantech.cn/api/wodi/getOneWord.php'
    var parameter = {} //参数
    for(var i = 0; i < 5000; i++) {
        let data = common.postFun(url, parameter)
        //2.判断不在数组中才push进去
        let ids = []
        list.map((item) => {
            ids.push(item.id)
        })
        if(ids.indexOf(data.data[0].id) == -1) {
            list.push(data.data[0])
        }
    log(11111, i)
    }
    log(222, list.length)
    common.writeFileSyncFun(list, 'data/words.json')
}

//2.转换成需要的格式
var readList = () => {
    var list = common.readFun('data/words.json')
    var result = []
    // rcyp@被子-床单
    list.map((item) => {
        result.push(`${item.type || 'qt'}@${item.words1}-${item.words2}`)
    })
    common.writeFileSyncFun(result, 'data/wordsList.json')
}


var __main = function() {
    // requestList()
    readList()
}
__main()
