// 爬取最美祝福的文案
var request = require('sync-request')
var fs = require('fs')
var path=require('path')
var url = require('url')

var common = require('./utils/common.js')
var pictureDownloader = require('./utils/pictureDownloader')

var log = console.log.bind(console)

var urls = {
    timu: 'https://api.zuiqiangyingyu.net/index.php/api/idiom_master/wechat_game/G_Guess',
    answer: 'https://api.zuiqiangyingyu.net/index.php/api/idiom_master/wechat_game/G_Sub',
}
var canshu = {
    Cookie: 'ci_session=d245765744e397ea3e2c7ce93a5be0b2042388a6',
    type: 'form',
}

//2.回答题目
var answerTimu = (obj) => {
    var url = urls.answer
    var parment = common.parment({
        idiom_id: obj.id,
        answer: obj.answer,
    })
    url += '?' + parment
    //这里需要转义中文字符
    log(111, url, encodeURI(url))
    var data = common.postFun(encodeURI(url), {}, canshu)
    log(2222, data)
}

// var list = common.readFun('content.json')
var list = []
//1.获取题目
var getTimu = (list) => {
    var url = urls.timu
    var data = common.postFun(url, {}, canshu)
    log(1111, data)
    if(data.c == 0) {
        var timu = data.d.list
        if(timu) {
            list.push(timu)
            //回答题目
            answerTimu(timu)
        }
    }

}
//3.取题答题循环
var forGet = (len) => {
    for(let i = 0; i < len; i++) {
        getTimu(list)
    }
    common.writeFileSyncFun(list, 'content.json')
}

//4.通过sid去取题目
var getBySid = (sid) => {
    if(!sid) {
        return
    }
    log(222, sid)
    var url = urls.getBySid + sid
    var data = common.getFun(url)

    if(data.c == 0) {
        var timu = data.d.list[0]
        return timu

    }
}
var forEachList = () => {
    var ayyList = common.readFun('content.json').d.list
    var valuesArray = Object.values(ayyList)
    var list = common.readFun('data/content2.json') || []
    valuesArray.forEach((item) => {
        Object.values(item).forEach((i) => {
            var timu = getBySid(i)
            if(timu) {
                list.push(timu)
            }
        })
    })
    common.writeFileSyncFun(list, 'data/content2.json')
}

// //5.配置对应的题目
// var setTimu = (len) => {
//     var file = 'data/list.json'
//     var list = common.readFun(file) || []
//     var result = common.readFun('data/localData.json')
//     var first = 100
//     for(let i = first; i < first + len; i++) {
//         log(1111, result, result.length)
//         if(result.length == len) {
//             log('-结束i-', i) // 1004
//             break
//         }
//         if(list[i].answer.length > 8) {
//             continue
//         }
//
//         var item = list[i]
//         let obj = {
//             // "level": item.pass,
//             "level": result.length + 1,
//             "question": item.file2,
//             "answer": item.answer,
//             "explain": item.artist,
//         }
//         result.push(obj)
//     }
//     common.writeFileSyncFun(result, 'data/localData.json')
// }

var setTimu = (len) => {
    var file = 'content.json'
    var list = common.readFun(file) || []
    var result = []
    var first = 0
    for(let i = first; i < len; i++) {
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
            // "level": item.pass,
            "level": result.length + 1,
            "question": item.pic,
            "answer": item.answer,
            "explain": item.explain,
        }
        result.push(obj)
    }
    common.writeFileSyncFun(result, 'data/list.json')
}

function getTenNum(arr, len = 4) {
    var result = [];
    // var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

    var count = arr.length;
    for (var i = 0; i < len; i++) {
        var index = ~~(Math.random() * count) + i;
        result[i] = arr[index];
        arr[index] = arr[i];
        count--;
    }
    return result
}
var setLen = (len) => {
    var list = common.readFun('data/list.json')
    var result = common.readFun('data/lianxian.json')
    var length = len - result.length
    result = result.concat(result.slice(0, length))
    log(11111, result.length)
    common.writeFileSyncFun(result, 'data/lianxian.json')
}
// //设置成语连线数组
var setChengyuArr = () => {
    var that = this
    var list = common.readFun('data/list.json')
    var result = []
    var li = []
    list.forEach((item) => {
        if(li.length == 4) {
            result.push(li)
            li = []
        }
        li.push({
            word: item.answer,
        })
    })
    log(1111, result)
    common.writeFileSyncFun(result, 'data/lianxian.json')
}


var __main = function() {
    // forGet(5000)
    // forEachList()
    // setTimu(4500)

    //设置成语的数组（成语连线）
    // setChengyuArr()
    setLen(1800)

    // var len = common.readFun('data/localData.json').length
    // log(len)
}



__main()
