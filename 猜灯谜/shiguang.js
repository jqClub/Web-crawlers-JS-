// 爬取最美祝福的文案
var request = require('sync-request')
var fs = require('fs')
var path=require('path')
var url = require('url')

var common = require('./utils/common.js')
var pictureDownloader = require('./utils/pictureDownloader')

var log = console.log.bind(console)

//1.先获取所有题目，存入data
var getTimu = () => {
    var url = 'https://zch5-update.szfyhd.com/dengmi/pay0.1.4/dengmi/configcc4b85ce.json'
    let data = common.getFun(url)
    common.writeFileSyncFun(data, 'data/list.json')
}

//2.修改成对应的格式
class Subject {
    constructor(obj) {
        this.question = obj.question;
        this.answer = obj.answer;
        this.explain = obj.explain
        this.level = obj.id
    }
}

var changeData = () => {
    var that = this
    var list = common.readFun('data/list.json')
    var questions = list.questions
    var lastList = []
    questions.map((item) => {
        lastList.push(new Subject(item))
    })
    //只取前900条数据
    common.writeFileSyncFun(lastList.slice(0, 900), 'data/lastData.json')
}

var __main = function() {
    // getTimu()
    changeData()
}
__main()
