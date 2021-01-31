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
    var url = 'https://api.maiyizhi.cn/index.php?r=api/common/config&key=avataricons2&version=5.5&platform=ios&appPlatform=wechat&app=zuogetouxiang&unionid=&user_id='
    var parameter = {} //参数
    let data = common.postFun(url, parameter)
    common.writeFileSyncFun(data, 'data/list.json')
}

//2.转换成需要的格式
var readList = () => {
    var list = common.readFun('data/list.json')
    var result = []
    // rcyp@被子-床单
    list.data.map((item, index) => {
        item.list.map((img) => {
            if(img.src) {
                var downName = img.src.slice(30)
                // pictureDownloader(img.src, 'covers/' + downName)
            }
        })
    })
    // common.writeFileSyncFun(result, 'data/wordsList.json')
}


var downImgs = () => {
    var list = common.readFun('data/list.json')
    list.data.map((item) => {
        item.list.map((img) => {
            if(img.src) {
                var downName = img.src.slice(30)
                pictureDownloader(img.src, 'covers/' + downName)
            }
        })
    })
}

var __main = function() {
    // requestList()
    // downImgs()
    // readList()
}
__main()
