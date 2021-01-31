var request = require('sync-request')
var fs = require('fs')
var path=require('path')
var url = require('url')

var common = require('./utils/common.js')
var pictureDownloader = require('./utils/pictureDownloader')

var e = require("./utils/md5.js") //新增引入md5

var log = console.log.bind(console)

var urls = {
    timu: 'https://song.m2gou.com/api/getBarrier',  //获取题目
    answer: 'https://song.m2gou.com/api/reportBarrier',
}
var token = '677cd58ce0699e95cf51a2d0c3c59713'

var urlSuffix = ''  //请求去取对应的地址

//0903新增加密使用的方法
var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}
var i = function(e) {
    return !(!e || "object" !== (undefined === e ? "undefined" : t(e)) || Array != e.constructor);
}
var encrypt = function(t) {
    var n = "", r = new Array();
    for (var o in t) r.push(o);
    r = r.sort();
    for (var u in r) {
        var a = t[r[u]];
        if (i(a)) {
            var m = "";
            for (var s in a) {
                var h = a[s];
                if (i(h)) for (var l in h) m += h[l]; else m += h;
            }
            a = m;
        }
        n += r[u] + "=" + a + "&";
    }
    return n += "key=22b802831946772d4907171839f1ed77", console.log(n), e(n);
}

//2.回答题目
var answerTimu = (id) => {
    var url = urls['answer'+urlSuffix]
    var canshu = {
        token: token,
        id: id
    }
    canshu.sign = encrypt(canshu)
    var data = common.postFun(encodeURI(url), canshu, {
        type: 'form',
    })
}

// var list = []
//1.获取题目
var forGet = (len) => {
    var list = common.readFun('./data/list.json') || []
    for(let i = 0; i < len; i++) {
        var url = urls['timu'+urlSuffix]
        var canshu = {
            token: token,
            timestamp: 1599098333,
        }
        canshu.sign = encrypt(canshu)
        var data = common.postFun(encodeURI(url), canshu, {
            type: 'form',
        })
        console.log(11, data)
        try{
            if(data.code == 0 && data.barrier) {
                list.push(data.barrier)  //push到数组中去
                //说明请求成功，保存到本地
                var id = data.barrier && data.barrier.id
                answerTimu(id)
            } else {
                break
            }
        }catch (e) {
            common.writeFileSyncFun(list, './data/list.json')
        }
    }
    common.writeFileSyncFun(list, './data/list.json')
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
    // var list = common.readFun(file).slice(0, 503)
    var list = common.readFun(file)
    console.log(99, list, list.length)
    var result = []
    var first = 0
    for(let i = first; i < list.length; i++) {
        if(result.length == len) {
            log('-结束i-', i)
            break
        }
        var item = list[i]
        item.answer = item.songName.join('')
        if(item.answer.length > 8) {
            continue
        }
        let obj = {
            "level": result.length + 1,
            "question": item.music,
            "answer": item.answer,
            "explain": item.singer,
        }
        result.push(obj)
    }
    common.writeFileSyncFun(result, 'data/localData.json')
}

//题目数量不够，截取后面的拼接到前面去
var spliceSpecifiedNumber = (needNumber) => {
    var file = 'data/localData.json'
    var list = common.readFun(file)
    var len = needNumber - list.length
    for(var i = 0; i < len; i++) {
        list.push(list[i])
    }
    common.writeFileSyncFun(list, 'data/lastData.json')
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

//20200328新增找到所有的img，去重
function unique (arr) {
    return Array.from(new Set(arr))
}
var getAllImgs = (arr) => {
    var result = []
    arr.forEach((itemArr) => {
        itemArr.forEach((item) => {
            var emojisArr = item.emojis.split(',')
            item.emojisArr = emojisArr
            result.push(...emojisArr)  //合并数组
        })
    })
    result = unique(result)  //去重
    common.writeFileSyncFun(result, './data/emojisArr.json')
}
//拼接成指定的格式
var setFormat = () => {
    var emojiLastList = []
    var emojiList = common.readFun('data/list.json') || []
    emojiList.forEach((itemArr) => {
        itemArr.forEach((item) => {
            if(item.answer.length <= 8) {
                emojiLastList.push({
                    "level": emojiLastList.length + 1,
                    "question": item.emojisArr,  //emoji数组
                    "answer": item.answer,
                    "explain": item.guessclass,
                })
            }
        })
    })
    common.writeFileSyncFun(emojiLastList, './data/emojiLastList.json')
}
//找到对应关系
var findCorrespond = () => {
    var emojiLastList = common.readFun('./data/emojiLastList.json') || []
    var ind = 0
    var res = {}
    emojiLastList.forEach((item, index) => {
        log(1111, item.answer)
        if(item.answer.length == item.question.length) {
            ind += 1
            log(111, ind)
            var answer = item.answer.split('')
            answer.forEach((ite, answerIndex) => {
                log(2222, answer, answerIndex, item.question)
                var key = answer[answerIndex]
                res[key] = item.question[answerIndex]
            })
        }
    })
    log(2222, res)
    common.writeFileSyncFun(res, './data/emojiTextToPicture.json')
}
//找到之前歌名对应的数组
var findMusicNameCorrespond = () => {
    var arr = music.options
    var result = {}
    var emojiTextToPicture = common.readFun('./data/emojiTextToPicture.json') || []
    arr.forEach((item) => {
        var len = item.length
        let res = []
        for(let i = 0; i < len; i++) {
            var one = item[i]
            if(emojiTextToPicture[one]) {
                res.push(emojiTextToPicture[one])
            }
        }
        if(res.length == len) {
             //说明可以存进去
            result[item] = res
        }
    })
    log(222, result)
    log(1111, arr.length, Object.keys(result).length)
    common.writeFileSyncFun(result, './data/emojiMusicName.json')
}
//拼接成需要的数组
var needArr = () => {
    var arr = music.content
    var result = []
    var res = []
    var emojiMusicName = common.readFun('./data/emojiMusicName.json') || {}
    for(var key in emojiMusicName) {
        // log(22222, key)
        arr.forEach((item) => {
            // log(111, item.answer, emojiMusicName[key])
            if(item.answer == key) {
                item.question = emojiMusicName[key]
                //说明没找到
                if(res.indexOf(key) == -1) {
                    result.push(item)
                    res.push(key)
                }
            }
        })
    }
    log(222, result, Object.keys(emojiMusicName).length, result.length)
    common.writeFileSyncFun(result, './data/emojiMusicList.json')
}
//合并2个数组
var mergeArr = () => {
    var emojiLastList = common.readFun('./data/emojiLastList.json') || []
    var emojiMusicList = common.readFun('./data/emojiMusicList.json') || []
    // var arr = emojiMusicList.concat(emojiLastList, emojiLastList.splice(0, 50));
    var arr1 = emojiLastList.slice(0, 50)
    var arr = [...emojiLastList,...emojiMusicList, ...arr1]
    common.writeFileSyncFun(arr, './data/emojis.json')
}


//2020.1.31新增——下载MP3到本地
var getImgName = (str, split = '/') => {
    if(str.indexOf('?')) {
        str = str.split('?')[0]
    }
    var arr = str.split(split)
    var imgName = arr.pop()
    return imgName
}

var downMp3Url = (url) => {
    var file = 'file/' + getImgName(url)
    pictureDownloader(url, file)
}

var downMp3 = () => {
    var list = common.readFun('data/localData.json')
    var len = list.length
    for (var i = 0; i < len; i++) {
        log(111, i)
        var item = list[i]
        if(item.question) {
            downMp3Url(item.question)
        }
    }
}


var __main = function() {
    // forGet(1734) //循环去获取题目
    // setTimu(4500) //设置成需要的题库
    downMp3() //下载MP3

    // pinJie()  //拼接3个类型的题库
    // daluan() //打乱所有的题库
    // spliceSpecifiedNumber(900) //拼接到指定数量

    // var len = common.readFun('data/localData.json').length
    // log(len)

    // getAllImgs(content1.emojiData)
    // setFormat()
    // findCorrespond()
    // findMusicNameCorrespond()
    // needArr()
    // mergeArr()
}


__main()
