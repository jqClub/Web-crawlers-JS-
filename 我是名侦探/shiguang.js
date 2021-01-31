// 爬取最美祝福的文案
var request = require('sync-request')
var fs = require('fs')
var path=require('path')
var url = require('url')

var common = require('./utils/common.js')
var pictureDownloader = require('./utils/pictureDownloader')

var e = require("./utils/md5.js") //新增引入md5

var log = console.log.bind(console)

// import {emojiData} from './content.js'
// var content1 = require('./content.js')

// var music = require('./music.js')  //之前的题目

var urls = {
    timu: 'https://onxcx.wanzhushipin.cn/detective/1.0.1/detective/question?uid=1303808&tick=1588422890&key=44ba057a94183b5ab5262ae660e2d210',  //获取题目
    // answer: 'https://onxcx.wanzhushipin.cn/detective/1.0.1/detective/submitQution?uid=1303808&qid=1&answers=%E5%B7%A6%E4%BE%A7%E7%8A%AF%E4%BA%BA&tick=1588423327&key=2104778556ced8d874bd0a414b2492ce',
    answer: 'https://onxcx.wanzhushipin.cn/detective/1.0.1/detective/submitQution?uid=1303808&tick=1588423327&key=2104778556ced8d874bd0a414b2492ce',
}
var canshu = {
    Cookie: 'JSESSIONID=11E82E8B5CEE7F4BC11B3ED42CC5E0FF',
    type: 'form',
}

var urlSuffix = ''  //请求去取对应的地址

var getSN = function(e) {
    for (var o = Object.keys(e), r = [], t = 0; t < o.length; t++) {
        var n = o[t];
        o[t] = n.toLocaleLowerCase(), r[o[t]] = e[n];
    }
    o.sort(function(e, o) {
        return e > o ? 1 : e < o ? -1 : 0;
    });
    for (var a = "", t = 0; t < o.length; t++) {
        var s = o[t];
        a = a + s + "=" + r[s] + "&";
    }
    return a + "key=" + 'fatality';
    // return a + "key=" + this.globalData.sn;
}

//2.回答题目
var answerTimu = (obj = {}) => {
    if(!obj.qid) {
        return
    }
    // var url = urls['answer'+urlSuffix]
    var url = `https://onxcx.wanzhushipin.cn/detective/1.0.1/detective/submitQution?uid=1303808&qid=${obj.qid}&answers=${obj.ranswers}&tick=1588423327&key=2104778556ced8d874bd0a414b2492ce`
    var parment = {
        uid: '1303808',
        qid: obj.qid,
        answers: obj.ranswers,
        tick: Date.parse(new Date()) / 1e3
    }
    parment.key = e(getSN(parment))
    url += '?' + common.parment(parment)
    // var parment = common.parment({
    //     uid: '1303808',
    //     qid: obj.qid,
    //     answers: obj.ranswers,
    //     tick: Date.parse(new Date()) / 1e3
    // })
    // u.key = e(s.getSN(u))
    // url += '?' + parment
    //这里需要转义中文字符
    log(111, encodeURI(url))
    var data = common.postFun(encodeURI(url), {}, {
        type: 'form',
    })
    // var data = common.postFun(encodeURI(url), {
    //     subjectId: obj.subjectId,
    //     answer: obj.answer,
    // }, canshu)
    log(2222, data)
}

// var list = []
//1.获取题目
var forGet = (len) => {
    var list = common.readFun('./data/list.json')
    var qids = []
    //获取所有的qid
    list.forEach((item) => {
        log(3333, item)
        qids.push(item.qid)
    })

    for(let i = 0; i < len; i++) {
        // var url = 'https://xcx.wxdcxs.com/app/index.php?i=43&t=0&v=1.01&from=wxapp&c=entry&a=wxapp&do=Item&m=jiong_brain&itemid=' + (i + 1)
        // var url = 'https://lccyl.coinship.cn/index.php/Admin/chptlist/titlelist'
        var url = urls['timu'+urlSuffix]
        // var data = common.postFun(url, {}, canshu)
        var data = common.getFun(url)
        try{
            var dataList = data.data || []
            log(7777, dataList)
            if(dataList.length) {
                log(9999, dataList.length)
                dataList.forEach((item) => {
                    log(888, qids, item.qid)
                    //说明没有添加过
                    if(qids.indexOf(item.qid) == -1) {
                        qids.push(item.qid)
                        list.push(item)
                        answerTimu(item)
                    }
                })
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

// //4.通过sid去取题目
// var getBySid = (sid) => {
//     if(!sid) {
//         return
//     }
//     log(222, sid)
//     var url = urls.getBySid + sid
//     var data = common.getFun(url)
//
//     if(data.c == 0) {
//         var timu = data.d.list[0]
//         return timu
//
//     }
// }
// var forEachList = () => {
//     var ayyList = common.readFun('content.json').d.list
//     var valuesArray = Object.values(ayyList)
//     var list = common.readFun('data/content2.json') || []
//     valuesArray.forEach((item) => {
//         Object.values(item).forEach((i) => {
//             var timu = getBySid(i)
//             if(timu) {
//                 list.push(timu)
//             }
//         })
//     })
//     common.writeFileSyncFun(list, 'data/content2.json')
// }

//5.配置对应的题目
var setTimu = (len) => {
    var file = 'data/list.json'
    var list = common.readFun(file).slice(0, 503)
    var result = []
    var first = 0
    for(let i = first; i < list.length; i++) {
        log(1111, result, result.length)
        if(result.length == len) {
            log('-结束i-', i)
            break
        }
        var item = list[i].Result
        if(item.answer.length > 8) {
            continue
        }
        let obj = {
            "level": result.length + 1,
            "question": item.url,
            "answer": item.answer,
            "explain": item.description,
        }
        result.push(obj)
    }
    log(1111, result.length)
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

// var setTimu = (len) => {
//     var file = 'data/lastData.json'
//     var list = common.readFun(file) || []
//     var result = []
//     var first = 0
//     for(let i = first; i < list.length; i++) {
//         log(1111, result, result.length)
//         // if(result.length == 900) {
//         //     log('-结束i-', i) // 1004
//         //     break
//         // }
//         if(list[i].answer.length > 8) {
//             continue
//         }
//
//         var item = list[i]
//         let obj = {
//             "level": result.length + 1,
//             "question": item.question,
//             "answer": item.answer,
//             "explain": item.explain,
//         }
//         result.push(obj)
//     }
//     common.writeFileSyncFun(result, 'data/lastData.json')
// }

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


var __main = function() {
    forGet(1000)
    // forGet(1500)
    // forGet(1500) //循环去获取题目
    // pinJie()  //拼接3个类型的题库
    // setTimu(4500) //设置成需要的题库
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
