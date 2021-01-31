// 爬取最美祝福的文案
var request = require('sync-request')
var fs = require('fs')
var path=require('path')
var url = require('url')

var common = require('./utils/common.js')
var pictureDownloader = require('./utils/pictureDownloader')

var log = console.log.bind(console)

//旧的题目
var forEachList = () => {
    var ayyList = common.readFun('content.json')
    var list = []
    for(let i = 0; i < ayyList.length; i++) {
        var item = ayyList[i]
        if(item.resultText.length > 8) {
            continue
        }

        let obj = {
            "level": i + 1,
            "question": item.imageUrl + item.imageName,
            "answer": item.resultText,
            "explain": item.description,
        }
        list.push(obj)
    }
    common.writeFileSyncFun(list, 'data/list.json')
}
// ---势力榜----
//1.取题目
var getTimu = () => {
    var result = []
    var url = 'https://xcx.vipxufan.com/star/api_gather/weeklist'
    for(let i = 0; i < 46; i++) {
        var parameter = {
            page: i+1,
            type: 1,
            uid: 'WXB71117',
            xid: 107,
        }

        var res = common.postFun(url, parameter)
            if(res.status == 200 && res.data && res.data.list && res.data.list.data) {
                var data = res.data.list.data || []
                result = [...result, ...data]
            }
    }
    log(111, result.length)
    common.writeFileSyncFun(result, 'data/listNew.json')
}
var forEachListNew = () => {
    var ayyList = common.readFun('data/listNew.json')
    var list = []
    for(let i = 0; i < ayyList.length; i++) {
        var item = ayyList[i]
        if(item.starName.length > 8) {
            continue
        }

        let obj = {
            "level": i + 1,
            "question": item.imgurl,
            "answer": item.starName,
            "explain": item.starName,
        }
        list.push(obj)
    }
    common.writeFileSyncFun(list, 'data/listNew1.json')
}


//因为不够900题，所以要合并旧的题
var mergeArray = () => {
    var list = common.readFun('data/list.json')
    var listNew1 = common.readFun('data/listNew1.json')
    var lastList = [...listNew1, ...list]
    var result = lastList.slice(0, 900)
    log(999, result.length)
    common.writeFileSyncFun(result, 'data/lastList.json')
}

var __main = function() {
    // forEachList()
    // getTimu()
    // forEachListNew()
    mergeArray()
}
__main()
