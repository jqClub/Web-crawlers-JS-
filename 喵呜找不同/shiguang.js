// 爬取最美祝福的文案
var request = require('sync-request')
var fs = require('fs')
var path=require('path')
var url = require('url')

var common = require('./utils/common.js')
var pictureDownloader = require('./utils/pictureDownloader')

var log = console.log.bind(console)

var aboutApi = {
    answer: {
        url: 'https://oto.yunw2.cn/app/index.php?i=109&t=0&v=1.0.7&from=wxapp&c=entry&a=wxapp&do=game_win&m=yf_zhaocha&sign=9340d5201e198496f757e85a774bd637'
        ,parameter: 'appid=wx8603ac2e6fca3bfb&uid=oFtZr5b3odjnoXFh69HzI_xo7LGE&scene=1006&version=n20190912&token=93c595fc94cf144fcac5df452c4f1149'
    },
    get: {
        url: 'https://oto.yunw2.cn/app/index.php?i=109&t=0&v=1.0.7&from=wxapp&c=entry&a=wxapp&do=start_game&m=yf_zhaocha&sign=6667c8410666bf61717e0a9851fc4288'
        ,parameter: 'appid=wx8603ac2e6fca3bfb&uid=oFtZr5b3odjnoXFh69HzI_xo7LGE&scene=1006&version=n20190912&token=93c595fc94cf144fcac5df452c4f1149&roomid=0&reset='
        ,success: (data) => {
            //判断是否成功
            if(data.data.status != 1) {
                return
            }
            var list = common.readFun('data/list.json')
            if(list.length > 1) {
                //判断是否已经存进去了
                if(list.slice(-1)[0].data.value == data.data.value) {
                    return
                }
            }
            list.push(data)
            common.writeFileSyncFun(list, 'data/list.json')
        }
    },
    share: {
        url: 'https://oto.yunw2.cn/app/index.php?i=109&t=0&v=1.0.7&from=wxapp&c=entry&a=wxapp&do=get_video_ticket&m=yf_zhaocha&sign=b7ab73f81ab556516526f4211b7531f0'
        ,parameter: 'appid=wx8603ac2e6fca3bfb&uid=oFtZr5b3odjnoXFh69HzI_xo7LGE&scene=1006&version=n20190912&token=93c595fc94cf144fcac5df452c4f1149'
        ,success: (data) => {

        }
    }
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

//拼接成900题目
var sliceTimu = () => {
    var list = common.readFun('data/lastData.json')
    log(22222, list.length)
    var localData = []
    list.forEach((item) => {
        // log(1111, item)
        let data = item.data
        let obj = {
            level: data.value,
            q: data.question
        }

        data.question.forEach((itemLi) => {
            let arr = getImgName(itemLi.url)
            itemLi.url = arr.slice(-2).join('/')
        })
        // log(222, obj)
        localData.push(obj)
    })
    common.writeFileSyncFun(localData, 'data/localData.json')
}

//11.4新增马甲-取901-1800题目
var majia = ()=> {
    var list = common.readFun('content.json')
    // var majiaData = []
    var majiaData = common.readFun('data/majiaDataNew.json')
    for(let i = 0; i < 190; i++) {
        let item = list[i]
        let data = item.data
        let obj = {
            // level: data.value,
            level: i+1,
            q: data.question
        }

        data.question.forEach((itemLi) => {
            let arr = getImgName(itemLi.url)
            itemLi.url = arr.slice(-2).join('/')
        })
        // log(222, obj)
        majiaData.push(obj)
    }
    log(2222, majiaData.length)
    common.writeFileSyncFun(majiaData, 'data/majiaDataNew.json', true)
}

var majia = ()=> {
    var list = common.readFun('content.json')
    // var majiaData = []
    var majiaData = common.readFun('data/majiaDataNew.json')
    for(let i = 0; i < majiaData.length; i++) {
        let item = majiaData[i]
        item.level = i+1


        // let data = item.data
        // let obj = {
        //     // level: data.value,
        //     level: i+1,
        //     q: data.question
        // }
        //
        // data.question.forEach((itemLi) => {
        //     let arr = getImgName(itemLi.url)
        //     itemLi.url = arr.slice(-2).join('/')
        // })
        // // log(222, obj)
        // majiaData.push(obj)
    }
    log(2222, majiaData.length)
    common.writeFileSyncFun(majiaData, 'data/majiaDataNew.json', true)
}

var __main = function() {
    // changeImg()
    // downImgs()
    // sliceTimu()

    majia()

    // for(let i = 0; i < 7; i++) {
        // request('get')
        // request('answer')
        // request('share')
    // }
    // getLen()
    // downUrl('https://oto.yunw2.cn/attachment/yf_zhaocha_resource/images/lv/1/pillow_2.png')
}

__main()
