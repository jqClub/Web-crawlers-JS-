// 爬取最美祝福的文案
var request = require('sync-request')
var fs = require('fs')
var path=require('path')
var url = require('url')

var common = require('./utils/common.js')
var pictureDownloader = require('./utils/pictureDownloader')

var log = console.log.bind(console)

// ---------------
var httpsToHttp = (str) => {
    var lastStr = str
    if(str.slice(0, 5) == 'https') {
        lastStr = `http${str.slice(5)}`
    }
    return lastStr
}
//1.先获取img,如果是https改成http的格式
var changeImg = () => {
    var list = common.readFun('data/list.json')
    for(let i = 0; i < list.length; i++) {
        let item = list[i]
        item.dressupList.forEach((listLi) => {
            listLi.image = httpsToHttp(listLi.image)
            listLi.thumb = httpsToHttp(listLi.thumb)
        })
    }
    common.writeFileSyncFun(list, 'data/lastData.json')
}
//获取图片名字
var getImgName = (str) => {
    if(str.indexOf('?')) {
        str = str.split('?')[0]
    }
    var arr = str.split('/')
    var imgName = arr.pop()
    return imgName
}
var downUrl = (imgUrl) => {
    pictureDownloader(imgUrl, 'covers/' + getImgName(imgUrl))
}
//替换成本地的地址
var changeUrl = (imgUrl) => {
    if(!imgUrl) {
        return ''
    }
    var str = 'https://www.unclay.com/jqclub/shaonv/'
    var newUrl = str + getImgName(imgUrl)
    log(newUrl)
    return newUrl
}
var downImgs = () => {
    var list = common.readFun('data/lastData.json')
    list.forEach((item) => {
        //下载图片到本地
        // downUrl(item.iconSelected)
        // downUrl(item.iconUnselected)
        //改变名字成本地地址
        item.iconSelected = changeUrl(item.iconSelected)
        item.iconUnselected = changeUrl(item.iconUnselected)
        item.dressupList.forEach((imgLi) => {
            // downUrl(imgLi.image)
            // downUrl(imgLi.thumb)
            //改变名字成本地地址
            imgLi.image = changeUrl(imgLi.image)
            imgLi.thumb = changeUrl(imgLi.thumb)
        })
    })
    common.writeFileSyncFun(list, 'data/localData.json')
}

var __main = function() {
    // changeImg()
    downImgs()
}

__main()
