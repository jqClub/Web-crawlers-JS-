// 爬取最美祝福的文案
var request = require('sync-request')
var fs = require('fs')
var path=require('path')
var url = require('url')

var common = require('./utils/common.js')
var pictureDownloader = require('./utils/pictureDownloader')

var log = console.log.bind(console)

var urls = {
    timu: 'https://api.zuiqiangyingyu.net/index.php/api/guess_pic/wechat_v2/Guess',  //猜百科
    timuNaojin: 'https://api.zuiqiangyingyu.net/index.php/api/guess_pic/brain/Guess',  //脑筋急转弯
    timuStar: 'https://api.zuiqiangyingyu.net/index.php/api/guess_pic/star/Guess', //猜明星
    answer: 'https://api.zuiqiangyingyu.net/index.php/api/guess_pic/wechat_v2/Sub',
    answerNaojin: 'https://api.zuiqiangyingyu.net/index.php/api/guess_pic/brain/Sub',
    answerStar: 'https://api.zuiqiangyingyu.net/index.php/api/guess_pic/star/Sub',
}
var canshu = {
    Cookie: 'PHPSESSID=e155bd998a32a3fd51cdc9ec99e74a78; path=/',
    type: 'form',
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
        // var url = urls['timu'+urlSuffix]
        var url = 'https://xcx.wxdcxs.com/app/index.php?i=43&t=0&v=1.01&from=wxapp&c=entry&a=wxapp&do=Item&m=jiong_brain&itemid=' + (i + 1)
        var data = common.postFun(url, {}, canshu)
        log(1111, data)
        if(data.errno == 0) {
            log(111, i)
            var timu = data.data
            if(timu) {
                list.push(timu)
                // //回答题目
                // answerTimu(timu)
            }
        } else {
            break
        }
    }
    common.writeFileSyncFun(list, 'contentZuijiong.json')
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


var __main = function() {
    forGet(60) //循环去获取题目
    // pinJie()  //拼接3个类型的题库
    // setTimu(4500) //设置成需要的题库
    // daluan() //打乱所有的题库

    // var len = common.readFun('data/localData.json').length
    // log(len)
}



__main()
