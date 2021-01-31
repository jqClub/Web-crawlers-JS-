// 爬取最美祝福的文案
var request = require('sync-request')
var fs = require('fs')
var path=require('path')
var url = require('url')

var common = require('./utils/common.js')
var pictureDownloader = require('./utils/pictureDownloader')

var log = console.log.bind(console)

//所有的url请求
var urls = {
    get: 'https://zl.zhaoyoupin.com/app/index.php?i=14&t=0&v=6.1.1&from=wxapp&c=entry&a=wxapp&do=subject&&state=we7sid-001fac3e55a83d8077b6d423c7cd77bf&sign=b792a90cc854eaa9710b23068e1a27bc',
    answer: 'https://zl.zhaoyoupin.com/app/index.php?i=14&t=0&v=6.1.1&from=wxapp&c=entry&a=wxapp&do=pass&&state=we7sid-001fac3e55a83d8077b6d423c7cd77bf&sign=0b2f072321606b69918668d4442425c7'
}
//请求的公共参数
var parmer = {
    m: 'yige_ctdr'
}
//判断是否在数组中，否则才push进去'
var inArray = (obj) => {
    var list = common.readFun('data/list.json')
    var r = []
    list.map((item) => {
       r.push(item.pass)
    })
    //说明不在数组中，push进去
    if(r.indexOf(obj.pass) == -1) {
        list.push(obj)
    }
    return list
}
//1.取题目
var getTimu = () => {
    var url = urls['get']
    let data = common.postFun(url, parmer, 'form')
    var timu = data.data.list
    if(!timu) {
        return
    }
    var par = {
        "question": timu.image,
        "answer": timu.right_answer,
        "explain": timu.tag,
        "pass": timu.pass,
    }
    var list = inArray(par)
    common.writeFileSyncFun(list, 'data/list.json')
}
//2.回答题目
var answerTimu = () => {
    var url = urls['answer']
    let data = common.postFun(url, parmer, 'form')
}
//3.循环调用上面的操作，可以拿到所有的题目
var loopTimu = () => {
    for(var i = 0; i < 3000; i++) {
        getTimu()
        answerTimu()
    }
}
//设置关卡数量
var setLevel = () => {
    var list = common.readFun('data/list.json')
    var last = []

    var index = 0
    for(let i = 0; i < list.length; i++) {
        let item = list[i]
        if(item.answer.length > 8) {
            continue
        }
        if(index >= 900) {
            break
        }
        index += 1
        item.level = index
        last.push(item)
    }
    common.writeFileSyncFun(last, 'data/lastData.json')
}


var __main = function() {
    // getTimu()
    // answerTimu()
    // loopTimu()
    setLevel()
}
__main()
