// 爬取最美祝福的文案
var request = require('sync-request')
var fs = require('fs')
var path=require('path')
var log = console.log.bind(console)

var common = require('./common.js')

var url = require('url')
var pictureDownloader = require('./pictureDownloader')

//1.请求列表数据
var requestList = () => {
    var url = 'https://www.twqhhj.com/chat/query'
    var parameter = {
        "where": {
            "status": 1,
            "$or": [{
                "collectionId": ""
            }, {
                "collectionId": null
            }]
        },
        "limit": 1000,
        "page": 1,
        "order": [
            ["createdAt", "DESC"]
        ]
    }
    var data = common.postFun(url, parameter)
    log('长度', data.obj.length)  //226条
    common.writeFileSyncFun(data, 'list.json')
}

//2.读取本地列表数据
var readList = () => {
    var list = common.readFun('list.json')
    var result = {}
    list.obj.map((item) => {
        log(2222, item.chatId)
        result[item.chatId] = requestContent(item.chatId)
    })
    common.writeFileSyncFun(result, 'content.json')
}
//请求详情信息
var requestContent = (chatId) => {
    var url = 'https://www.twqhhj.com/words/query'
    var parameter = {where: {chatId: chatId}}
    var data = common.postFun(url, parameter)
    log(2222, data)
    return data
}

//3.保存所有的图片
var saveImgs = () => {
    // 1.先读取content图片
    var content = common.readFun('content.json')
    // 2.循环并保存所有图片
    var result = []
    for(var key in content) {
        var value = content[key]
        value.obj.map((item) => {
            log(item)
            //    说明是图片
            if(item.type == 2)  {
                result.push(item.content)
            }
        })
        common.writeFileSyncFun(result, 'imgs.json')
    }
}

var downImgs = () => {
    var imgs = common.readFun('imgs.json')
    imgs.map((item) => {
        var downName = item.slice(9)
        pictureDownloader(`https://fs.serverzyx.com${item}`, 'covers/' + downName)
    })
}

var __main = function() {
    // requestList()
    // readList()
    // saveImgs()
    downImgs()
}
__main()
