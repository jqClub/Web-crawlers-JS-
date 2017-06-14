// 爬取时光网 top100 的页面
// url 为: http://www.mtime.com/top/movie/top100/

var request = require('sync-request')
var cheerio = require('cheerio')

var log = console.log.bind(console)

// ES6 定义一个类
class Movie {
    constructor() {
        // 分别是电影名/评分/引言/排名/封面图片链接
        this.title = ''
        this.name = ''
        this.score = 0
        this.quote = ''
        this.ranking = 0
        this.coverUrl = ''
    }
}

var cachedUrl = url => {
    // log('in cachedUrl', url, url.slice(31))
    // 1, 确定缓存文件名
    // 文件名不能包含以下字符有 \ 、/ 、: 、* 、?、 "、 <、>...
    var cacheFile = 'cached_html/' + url.slice(38, 45) + '-1.html'
    // log('cacheFile', url.slice(38, 45), cacheFile)
    // 2, 检查缓存文件是否存在
    // 如果存在就读取缓存文件
    // 如果不存在就下载并写入缓存文件
    var fs = require('fs')
    var exists = fs.existsSync(cacheFile)
    if (exists) {
        var data = fs.readFileSync(cacheFile)
        // log('data', data)
        return data
    } else {
        // 用 GET 方法获取 url 链接的内容
        // 相当于你在浏览器地址栏输入 url 按回车后得到的 HTML 内容
        var r = request('GET', url)
        // utf-8 是网页文件的文本编码
        var body = r.getBody('utf-8')
        // log('body', body)
        // 写入缓存
        fs.writeFileSync(cacheFile, body)

        return body
    }
}

var movieFromDiv = function(div) {
    log('in movieFromDiv')
    var e = cheerio.load(div)

    // 创建一个电影类的实例并且获取数据
    // 这些数据都是从 html 结构里面人工分析出来的
    var movie = new Movie()
    let px14 = e('.px14')
    // log('px14', px14)
    movie.name = px14.find('a').text()

    movie.score = e('.total').text() + e('.total2').text()
    movie.quote = e('.mt3').text()
    movie.ranking = e('.number').find('em').text()

    var pic = e('.mov_pic')
    movie.coverUrl = pic.find('img').attr('src')
    movie.title =  pic.find('a').attr('title')

    // log(movie)
    return movie
}

var moviesFromUrl = function(url) {
    log('in moviesFromUrl')
    // 调用 cached_url 来获取 html 数据
    // 我们不关心这个函数怎么获取到 HTML, 只要知道它可以根据 url 返回
    // 我们想要的 HTML 内容即可
    var body = cachedUrl(url)
    // cheerio.load 用来把 HTML 文本解析为一个可以操作的 DOM
    var e = cheerio.load(body)

    // 一共有 10 个 li
    var asyn = e('#asyncRatingRegion')
    // log('asyncRatingRegion', asyncRatingRegion)
    var movieDivs = asyn.find('li')
    // log('movieDivs.length', movieDivs.length)
    // // 循环处理 10 个 li
    var movies = []
    for (var i = 0; i < movieDivs.length; i++) {
        var div = movieDivs[i]
        // log('div', div)
        // 扔给 movieFromDiv 函数来获取到一个 movie 对象
        var m = movieFromDiv(div)
        movies.push(m)
    }
    // log('movies', movies)
    return movies
}

var saveMovie = function(movies) {
    log('in saveMovie')
    // JSON.stringify 第 2 3 个参数配合起来是为了让生成的 json
    // 数据带有缩进的格式, 第三个参数表示缩进的空格数
    // 建议当套路来用
    // 如果你一定想要知道原理, 看下面的链接(不建议看)
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
    var s = JSON.stringify(movies, null, 2)
    // 把 json 格式字符串写入到 文件 中
    var fs = require('fs')
    var path = 'shiguang.txt'
    fs.writeFileSync(path, s)
}
//
var downloadCovers = movies => {
    // 使用 request 库来下载图片
    var request = require('request')
    var fs = require('fs')
    for (var i = 0; i < movies.length; i++) {
        var m = movies[i]
        var url = m.coverUrl
        // 保存图片的路径
        var path = 'covers/' + m.ranking + '.' + m.title.split('/')[0] + '.jpg'
        // var path = 'covers/' + m.ranking + '.' + m.name.split(' ')[0] + '.jpg'
        // 下载并保存图片的套路
        request(url).pipe(fs.createWriteStream(path))
    }
}

var __main = function() {
    // 主函数
    var url = 'http://www.mtime.com/top/movie/top100/'
    var movies = moviesFromUrl(url)
    // log(movies)
    // 循环剩下的9个网址
    for (var i = 2; i < 11; i++) {
        var start = i
        var url = `http://www.mtime.com/top/movie/top100/index-${i}.html`
        var moviesInPage = moviesFromUrl(url)
        // 注意这个 ES6 的语法
        movies = [...movies, ...moviesInPage]
    }
    // log(movies)
    saveMovie(movies)

    downloadCovers(movies)
}

__main()
