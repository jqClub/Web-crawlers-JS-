// 爬取最美祝福的文案
var request = require('sync-request')
var fs = require('fs')
var path=require('path')
var url = require('url')

var common = require('./utils/common.js')
var pictureDownloader = require('./utils/pictureDownloader')

var log = console.log.bind(console)

var urls = {
    timu: 'https://api.zuiqiangyingyu.net/index.php/api/guess_v2/Index?token=790dad49a0340a83bd9ff94cb4968b4f&user_id=43845854&wechat_type=wechat_song',
    answer: 'https://api.zuiqiangyingyu.net/index.php/api/guess_v2/Sub?wechat_type=wechat_song&token=790dad49a0340a83bd9ff94cb4968b4f&user_id=43845854',
    // answer: 'https://api.zuiqiangyingyu.net/index.php/api/guess_v2/Sub?wechat_type=wechat_song&token=790dad49a0340a83bd9ff94cb4968b4f&user_id=43845854&sid=4635&answer=%E4%B8%AD%E5%9B%BD%E8%AF%9D'
    getBySid: 'https://api.zuiqiangyingyu.net/index.php/api/guess_v2/Index?token=790dad49a0340a83bd9ff94cb4968b4f&user_id=43845854&wechat_type=wechat_song&sid='
    // getBySid: 'https://api.zuiqiangyingyu.net/index.php/api/guess_v2/Index?token=790dad49a0340a83bd9ff94cb4968b4f&user_id=43845854&wechat_type=wechat_song&sid=1390'
}

//2.回答题目
var answerTimu = (obj) => {
    var url = urls.answer
    var parment = common.parment({
        sid: obj.id,
        answer: obj.answer,
    })
    url += parment
    //这里需要转义中文字符
    var data = common.getFun(encodeURI(url))
}

// var list = common.readFun('content.json')

//1.获取题目
var getTimu = (list) => {
    var url = urls.timu
    var data = common.getFun(url)

    if(data.c == 0) {
        var timu = data.d.list[0]
        list.push(timu)
        //回答题目
        answerTimu(timu)
    }

}
//3.取题答题循环
var forGet = (len) => {
    for(let i = 0; i < len; i++) {
        getTimu(list)
    }
    // common.writeFileSyncFun(list, 'content.json')
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

//5.配置对应的题目
var setTimu = (len) => {
    var file = 'data/list.json'
    var list = common.readFun(file) || []
    var result = common.readFun('data/localData.json')
    var first = 100
    for(let i = first; i < first + len; i++) {
        log(1111, result, result.length)
        if(result.length == len) {
            log('-结束i-', i) // 1004
            break
        }
        if(list[i].answer.length > 8) {
            continue
        }

        var item = list[i]
        let obj = {
            // "level": item.pass,
            "level": result.length + 1,
            "question": item.file2,
            "answer": item.answer,
            "explain": item.artist,
        }
        result.push(obj)
    }
    common.writeFileSyncFun(result, 'data/localData.json')
}

// var setTimu = () => {
//     var file = 'data/list.json'
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

//4个选项配置，1.先抽出所有的答案。2.和正确答案进行拼接
var getAllAnswer = () => {
    var list = common.readFun('data/list.json')
    var result = []
    list.forEach((item) => {
        result.push(item.answer)
    })
    common.writeFileSyncFun(result, 'data/allAnswer.json')
}

//2020.1.31新增——下载MP3到本地
var getImgName = (str, split = '/') => {
    if(str.indexOf('?')) {
        str = str.split('?')[0]
    }
    // var arr = str.split('/')
    // var arr = str.split('guess')
    var arr = str.split(split)
    var imgName = arr.pop()
    return imgName
}

var downMp3 = () => {
    var list = common.readFun('data/list.json')
    var len = list.length
    for (var i = 0; i < len; i++) {
        log(111, i)
        var item = list[i]
        // if(item.file) {
        //     downMp3Url(item.file)
        // }
        if(item.file2) {
            downMp3Url(item.file2)
        }
        log(222, i)
    }
    return


}
var downMp3Url = (url) => {
    // var url = 'https://static.zuiqiangyingyu.cn/guess/a/b180304dc1a7ef7b93696ef64d35a9d6.mp3'
    // var dest = 'covers/'
    var file = 'file2' + getImgName(url, 'guess')

    // log(222, file.split('/').pop())
    // log(1111, file)
    var cacheFile = file.replace(getImgName(url), '')
    log(999, cacheFile)
    var dest = common.creatFile(cacheFile)
    pictureDownloader(url, file)
}


var __main = function() {
    // forGet(500)
    // forEachList()
    // setTimu(2700)

    // getAllAnswer()
    downMp3()

    // var len = common.readFun('data/localData.json').length
    // log(len)
}



__main()
