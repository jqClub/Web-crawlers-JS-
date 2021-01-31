// 爬取最美祝福的文案
var request = require('sync-request')
var fs = require('fs')
var path=require('path')
var url = require('url')

var common = require('./utils/common.js')
var pictureDownloader = require('./utils/pictureDownloader')

var log = console.log.bind(console)

//1.获取所有的列表
var url = 'https://xinli-wxxcx-api.cuiqiu.com/api.php'
var getAllList = () => {
    var list = []
    for(let i = 0; i < 1000; i++) {
        var parameter = `action=getTestList&type=index&page=${i+1}&menuId=undefined&searchKey=undefined&v=1.0.0&platform=wx_xcx&system=devtools`

        var data = common.postFun(url, parameter, 'form').data.testList
        if(data.more == 0) {
            break
        }
        list.push(...data.data)
    }
    common.writeFileSyncFun(list, 'content.json')
}
//2.获取列表详情
var getDetail = () => {
    var list = common.readFun('content.json')
    log(1111, list.length)
    var detailList = []
    for(let i = 0; i < list.length; i++) {
        var id = list[i].id
        var parameter = `action=getTestDetail&id=${id}&v=1.0.0&platform=wx_xcx&system=devtools`
        var data = common.postFun(url, parameter, 'form').data.testDetail
        if(!detailList[id]) {
            detailList.push({
                [id]: data
            })
        }
        log(2222, i)
    }
    common.writeFileSyncFun(detailList, 'data/list.json')
}

//1.获取题目-回答题目-看视频获得机会
var request = (type) => {
    var obj = aboutApi[type]
    var data = common.postFun(obj['url'], obj['parameter'], 'form')
    if(obj['success']) {
        obj['success'](data)
    }
}

//2.截取需要的长度
var getLen = () => {
    var list = common.readFun('content.json')
    var index = 0
    for(let i = 1; i < list.length; i++) {
        if(list[i-1].data.value > list[i].data.value) {
            index = i
            break
        }
    }
    common.writeFileSyncFun(list.slice(0, index), 'data/lastData.json')
}
//3.下载图片到本地


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
    return arr
    // var imgName = arr.slice(-1)[0]
    // return imgName
}
var downUrl = (imgUrl) => {
    var arr = getImgName(imgUrl)
    var len = arr.length
    // common.creatFile('covers/' + arr[len-2])
    // pictureDownloader(imgUrl, 'covers/' + arr[len-2] + '/' + arr[len-1])
    // log(222, arr.slice(-2).join('/'))
    pictureDownloader(imgUrl, 'covers/' + arr.slice(-2).join('-'))
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

    list.slice(2000).forEach((item) => {
        //改变名字成本地地址
        // item.iconSelected = changeUrl(item.iconSelected)
        // item.iconUnselected = changeUrl(item.iconUnselected)
        item.data.question.forEach((imgLi) => {
            downUrl(imgLi.url)
            //改变名字成本地地址
            // imgLi.image = changeUrl(imgLi.image)
            // imgLi.thumb = changeUrl(imgLi.thumb)
        })
    })
    // common.writeFileSyncFun(list, 'data/localData.json')
}

//切片成900题
var sliceTimu = () => {
    var list = common.readFun('data/lastData.json')
    log(22222, list.length)
    var localData = []
    list.forEach((item) => {
        log(1111, item)
        let data = item.data
        let obj = {
            level: data.value,
            q: data.question
        }

    data.question.forEach((itemLi) => {
            let arr = getImgName(itemLi.url)
            itemLi.url = arr.slice(-2).join('/')
        })
        log(222, obj)
        localData.push(obj)
    })
    common.writeFileSyncFun(localData, 'data/localData.json')
}

var __main = function() {
    // getAllList()
    getDetail()

    // changeImg()
    // downImgs()
    // sliceTimu()
    // for(let i = 0; i < 7; i++) {
        // request('get')
        // request('answer')
        // request('share')
    // }
    // getLen()
    // downUrl('https://oto.yunw2.cn/attachment/yf_zhaocha_resource/images/lv/1/pillow_2.png')
}

__main()
