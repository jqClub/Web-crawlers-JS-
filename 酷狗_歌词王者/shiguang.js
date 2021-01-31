// 爬取最美祝福的文案
var request = require('sync-request')
var fs = require('fs')
var path=require('path')
var url = require('url')

var common = require('./utils/common.js')
var pictureDownloader = require('./utils/pictureDownloader')

var log = console.log.bind(console)

var urls = {
    timu: 'https://minipro.kugou.com/quiz/v1/game/client/fetch?uid=q0003000116F01B86C07&sessionKey=0b4fd877372b8fcbe2b821597f99a1e6&t=1576281904114&sign=1629fbb1eb776703ebf4461898d05957&size=5&roomId=&offset=1&next=1&course=chinese&total_score=0',  //猜百科
}

var urlSuffix = 'Star'  //请求去取对应的地址

//2.回答题目
var answerTimu = (obj) => {
    var url = urls['answer'+urlSuffix]
    var parment = common.parment({
        idiom_id: obj.id,
        answer: obj.answer,
    })
    url += '?' + parment
    //这里需要转义中文字符
    // log(111, url, encodeURI(url))
    var data = common.postFun(encodeURI(url), {}, canshu)
    // log(2222, data)
}

var list = []
//1.获取题目
var forGet = (len) => {
    for(let i = 0; i < len; i++) {
        var url = urls['timu'+urlSuffix]
        var data = common.postFun(url, {}, canshu)
        log(1111, data)
        if(data.c == 0) {
            log(111, i)
            var timu = data.d.list
            if(timu) {
                list.push(timu)
                //回答题目
                answerTimu(timu)
            }
        } else {
            break
        }
    }
    common.writeFileSyncFun(list, 'content'+urlSuffix+'.json')
}
//2.拼接3个类型的题目
var pinJie = function() {
    var r = common.readFun('content.json')
    var r1 = common.readFun('contentNaojin.json')
    var r2 = common.readFun('contentStar.json')
    var result = r.concat(r1)
    result = result.concat(r2)
    common.writeFileSyncFun(result, 'data/list.json')
}


//5.配置对应的题目
var setTimu = (len) => {
    var file = 'data/list.json'
    var list = common.readFun(file) || []
    var result = []
    var first = 0
    for(let i = first; i < list.length; i++) {
        log(1111, result, result.length)
        // if(result.length == 900) {
        //     log('-结束i-', i) // 1004
        //     break
        // }
        if(list[i].answer.length > 8) {
            continue
        }

        var item = list[i]
        let obj = {
            "level": result.length + 1,
            "question": item.pic,
            "answer": item.answer,
            "explain": item.tag || item.answer,
        }
        result.push(obj)
    }
    common.writeFileSyncFun(result, 'data/localData.json')
}

//6.打乱题目顺序
var daluan = () => {
    // var arr = [0, 1, 2, 3, 4];
    var arr = common.readFun('data/localData.json')
    for (let i = 1; i < arr.length; i++) {
        const random = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[random]] = [arr[random], arr[i]];
    }
    common.writeFileSyncFun(arr, 'data/lastData.json')
}

var setTimu = () => {
    var file = 'data/localData.json'
    var list = common.readFun(file) || []
    var result = []
    var first = 0
    for(let i = first; i < list.length; i++) {
        if(list[i].answer.length > 8) {
            continue
        }

        var item = list[i]
        let obj = {
            "level": result.length + 1,
            "question": item.body,
            "answer": item.scname,
            "explain": item.singer,
            url: item.tracker.url[0]
        }
        log(1111, obj)
        result.push(obj)
    }
    common.writeFileSyncFun(result, 'data/lastData.json')
}

//1.获取所有的题目
var getTimu = (len) => {
    var url = `https://minipro.kugou.com/quiz/v1/game/client/fetch?uid=q0003000116F01B86C07&sessionKey=0b4fd877372b8fcbe2b821597f99a1e6&t=1576281904114&sign=1629fbb1eb776703ebf4461898d05957&size=${len}&roomId=&offset=1&next=1&course=chinese&total_score=0`
    var data = common.getFun(url)
    if(data.status == 1) {
        var result = data.data
        common.writeFileSyncFun(result, 'data/list.json')
    }
}
// 2.拼接需要的900道题目
var pinjieLen = (len) => {
    var result = common.readFun('data/localData.json')
    log(1111, result.length)
    return

    var list = common.readFun('data/list.json')
    var result = common.readFun('data/localData.json')
    var first = 0
    for(let i = first; i < list.length; i++) {
        log(1111, result.length, i)
        if(result.length == len) {
            log('-结束i-', i) // 1004
            break
        }
        result.push(list[i])
    }
    common.writeFileSyncFun(result, 'data/localData.json')
}


var __main = function() {
    // forGet(2000) //循环去获取题目
    // pinJie()  //拼接3个类型的题库
    // daluan() //打乱所有的题库

    // getTimu(3600)
    pinjieLen(900)
    // setTimu()

    // var len = common.readFun('data/localData.json').length
    // log(len)
}



__main()
