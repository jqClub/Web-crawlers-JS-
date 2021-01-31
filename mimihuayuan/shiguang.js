// 爬取最美祝福的文案
var request = require('sync-request')
var fs = require('fs')
var log = console.log.bind(console)

var getFun = (url) => {
    // // 用 GET 方法获取 url 链接的内容
    // // 相当于你在浏览器地址栏输入 url 按回车后得到的 HTML 内容
    var r = request('GET', url)
    var body = JSON.parse(r.getBody())
    return body
}
var readFun = function(cacheFile) {
    var exists = fs.existsSync(cacheFile)
    if (exists) {
        let data =  fs.readFileSync(cacheFile, 'utf-8')
        log(888, JSON.parse(data))
        return JSON.parse(data)
    } else {
       return []
    }
}
var writeFileSyncFun = function(body, cacheFile) {
    body = JSON.stringify(body, null, 2)
    // 写入缓存
    fs.writeFileSync(cacheFile, body)
}

//1.获取轮播的列表数据
var getIndexCarousel = function() {
    var url = 'https://yangzhiganlu.top/api/get.php?type=GetIndexCarousel&appName=zuimeiheji&tbl=zuimeiheji&version=2.1.0'
    var body = getFun(url)
    // 1, 确定缓存文件名
    // 文件名不能包含以下字符有 \ 、/ 、: 、* 、?、 "、 <、>...
    var cacheFile = `cached_html/getIndexCarousel.json`
    log(3333, body)
    body = JSON.stringify(body, null, 2)
    // 写入缓存
    fs.writeFileSync(cacheFile, body)
}

//2.获取推荐的列表数据
var getHttps = [
    {
        "id":"0",
        "tbl":"zuimeiheji",
        "name":"推荐",
        "create_time":"1555494497"
    },
    {
        "id":"46",
        "tbl":"zuimeiheji",
        "name":"养生",
        "create_time":"1555494497"
    },
    {
        "id":"45",
        "tbl":"zuimeiheji",
        "name":"祝福",
        "create_time":"1555494493"
    },
    {
        "id":"44",
        "tbl":"zuimeiheji",
        "name":"美文",
        "create_time":"1555494489"
    },
    {
        "id":"43",
        "tbl":"zuimeiheji",
        "name":"益智",
        "create_time":"1555494469"
    }]
//需要循环去处理数据
var getAll = function() {
    var that = this
    getHttps.map((obj) => {
        getList(obj)
    })
}
var getList = function(obj) {
    var that = this
    let result = []
    for (let i = 0; i < 1000; i++) {
        // https://yangzhiganlu.top/apiV3/common/get?method=artic&action=getChangeArtics&tbl=zuimeiheji&ad_self=1&page=1&pageindex=6&randId=3&version=2.1.0&token=db5d609e350369576f8b38daa8a565d2

        let url = `https://yangzhiganlu.top/api/get.php?type=GetAll&is_admin=1&page=${i+1}&count=6&tbl=zuimeiheji&ids=&ad_self=1&sort=${obj.id}&version=2.1.0`
        let body = getFun(url)
        if(body.length <= 0) {
            break
        }
        result = result.concat(body)
        log(obj.name, result.length)
    }
    // 文件名不能包含以下字符有 \ 、/ 、: 、* 、?、 "、 <、>...
    let cacheFile = `cached_html/${obj.name}.json`

    result = JSON.stringify(result, null, 2)
    // // 写入缓存
    fs.writeFileSync(cacheFile, result)
}

//3.爬取内容详情数据
var getAllContent = function(name) {
    // let name = '祝福'
    let cacheFile = `cached_html/${name}.json` //读取的文件
    let contentFile = `cached_html/${name}1.json`  //写入的文件


    let data =  readFun(cacheFile)
    let result = readFun(contentFile)
    let len = data.length
    for(let i = 0; i < len; i++) {
        let obj = data[i]
        log(11111, obj.id)
        if(obj.id && obj.title) {
            result.push(getContent(obj.id))
        }
    }
    result = JSON.stringify(result, null, 2)
    fs.writeFileSync(contentFile, result)
}

var getContent = function(id) {
    let token = 'db5d609e350369576f8b38daa8a565d2'
    var url = `https://yangzhiganlu.top/apiV2/get/selectOne.php?token=${token}&id=${id}&tbl=zuimeiheji&version=2.1.0`
    var body = getFun(url)
    return body
}

var __main = function() {
    var list = readFun('list.js')
    list.map((item) => {
        let _id = item.content.data._id
        log(11111, _id)
        var cacheFile = `mimihuayuan/${_id}.js`
        writeFileSyncFun(item, cacheFile)
    })
}
__main()
