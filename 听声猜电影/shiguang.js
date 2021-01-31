// 爬取最美祝福的文案
var request = require('sync-request')
var fs = require('fs')
var path=require('path')
var url = require('url')

var common = require('./utils/common.js')
var pictureDownloader = require('./utils/pictureDownloader')

var log = console.log.bind(console)

var result = []
var answers = []
//1.获取题目
var getTimu = (id) => {
    var url = `https://w.kuaiduodian.com/app/index.php?i=14&t=0&v=1.0.0&from=wxapp&c=entry&a=wxapp&do=go&state=we7sid-67faec85f8647e1849819bad97fcf075&m=kj_movie&sign=20974b604e9653283ea28a67b457b8be&guess_type=music&qizid=${id}&type=self`
    var data = common.getFun(url)
    var question = data.data.movieAudio  //音乐
    var answer = data.data.inform
    if(answers.indexOf(answer) > -1) {
        return
    }
    log(111, question, answer)
    answers.push(answer)
    if(answer && answer.length < 8) {
        var obj = {
            "question": question,
            "answer": answer,
            "explain": answer,
            "level": result.length + 1
        }
        result.push(obj)
    }


}
//3.取题答题循环
var forGet = (len) => {
    var firsrIndex = 0
    for(let i = firsrIndex; i < len + firsrIndex; i++) {
        log(111, i)
        getTimu(i+1)
    }
    common.writeFileSyncFun(result, 'content.json')
    common.writeFileSyncFun(answers, 'ids.json')
}

//拼接不够的题目
var pinjie = () => {
    var list = common.readFun('content.json')
    var list2 = common.readFun('./data/list.json').slice(0, 794)
    list2.forEach((item, index) => {
        item.level = 107 + index + 1
        list.push(item)
    })
    common.writeFileSyncFun(list, 'data/lastList.json')
}


var __main = function() {
    // getTimu(11309)

    // forGet(30000)
    pinjie()

    // var len = common.readFun('data/localData.json').length
    // log(len)
}



__main()
