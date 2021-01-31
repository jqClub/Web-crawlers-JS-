// 爬取最美祝福的文案
var request = require('sync-request')
var fs = require('fs')
var path=require('path')
var url = require('url')

var common = require('./utils/common.js')
var pictureDownloader = require('./utils/pictureDownloader')

var log = console.log.bind(console)

var urls = {
    timu: 'https://idiom.mamapai.net/cdy/question',
    answer: 'https://api.zuiqiangyingyu.net/index.php/api/guess_v2/Sub?wechat_type=wechat_song&token=790dad49a0340a83bd9ff94cb4968b4f&user_id=43845854',
    // answer: 'https://api.zuiqiangyingyu.net/index.php/api/guess_v2/Sub?wechat_type=wechat_song&token=790dad49a0340a83bd9ff94cb4968b4f&user_id=43845854&sid=4635&answer=%E4%B8%AD%E5%9B%BD%E8%AF%9D'
    getBySid: 'https://api.zuiqiangyingyu.net/index.php/api/guess_v2/Index?token=790dad49a0340a83bd9ff94cb4968b4f&user_id=43845854&wechat_type=wechat_song&sid='
    // getBySid: 'https://api.zuiqiangyingyu.net/index.php/api/guess_v2/Index?token=790dad49a0340a83bd9ff94cb4968b4f&user_id=43845854&wechat_type=wechat_song&sid=1390'
}

// //2.回答题目
// var answerTimu = (obj) => {
//     var url = urls.answer
//     var parment = common.parment({
//         sid: obj.id,
//         answer: obj.answer,
//     })
//     url += parment
//     //这里需要转义中文字符
//     var data = common.getFun(encodeURI(url))
// }

// var list = common.readFun('content.json')

var result = []
//1.获取题目
var getTimu = (index) => {
    var url = urls.timu
    var data = common.postFun(url, {
        id: index,
        token: null,
    })
    if(data.code == 0) {
        var obj = {
            "question": data.data.image,
            "answer": data.data.answer,
            "explain": data.data.answer,
            "level": index,
        }
        result.push(obj)
    }


}
//3.取题答题循环
var forGet = (len) => {
    for(let i = 0; i < len; i++) {
        log(11111, i)
        getTimu(i+1)
    }
    common.writeFileSyncFun(result, 'content.json')
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
//
// //5.配置对应的题目
// var setTimu = () => {
//     var file = 'content.json'
//     var list = common.readFun(file) || []
//
//     var result = common.readFun('data/list.json')
//     for(let i = 0; i < result.length; i++) {
//         result[i].explain = result[i].answer
//     }
//     common.writeFileSyncFun(result, 'data/list.json')
// }

//拼接不够的题目
var pinjie = () => {
    var list = common.readFun('content.json')
    var list2 = common.readFun('./data/list.json').slice(0, 498)
    list2.forEach((item, index) => {
        item.level = 402 + index + 1
        list.push(item)
    })
    // log(1111, list2.length)
    // var list3 = list.concat(list2)
    // log(1111, list3.length)
    common.writeFileSyncFun(list, 'data/lastList.json')

    // var list3 = common.readFun('data/lastList.json')
    // list3.forEach((item, index) => {
    //     log(111, index)
    // })
}


var __main = function() {
    // forGet(402)
    pinjie()

    // forEachList()
    // setTimu()

    // var len = common.readFun('data/localData.json').length
    // log(len)
}



__main()
