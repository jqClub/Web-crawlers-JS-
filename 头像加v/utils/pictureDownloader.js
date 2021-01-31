var log = console.log.bind(console)
const fs = require('fs')
const http = require('http')
var https = require('https');
const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36'

/**
 * 图片下载器
 * @param {string} url - 图片的网络地址
 * @param {string} dest - 保存图片的地址
 * @param {number} timeout - 超时时间，默认 3 分钟
 * @param {number} retries - 重试次数，默认重试 2 次
 */
module.exports = function pictureDownloader(url, dest, timeout = 3 * 60 * 1000, retries = 2) {
	let isRetry = false
	let req = https.request(url, res => res.pipe(fs.createWriteStream(dest)))
	req.setTimeout(timeout, () => {
		req.abort()
		isRetry = true
	})
	// req.setHeader('User-Agent', userAgent)
	req.on('error', () => {
		isRetry = true
	})
	req.on('close', () => {
		// 重试时，将超时时间递增 1 分钟
		if (isRetry && retries > 0) pictureDownloader(url, dest, timeout + 60 * 1000, retries - 1)
})
	req.end()
}