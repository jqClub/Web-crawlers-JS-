//作者 ：咫尺天涯 联系方式 827324885
//1.1.1版本更新内容
//更新部分正则  删除部分小程序独有但vue用不到而且可能引起报错的部分
//使用教程 和page文件同级即可
//cmd 到本文件目录下 然后执行 node index.js
//会自动生成 .vue .css文件 不影响原小程序运行
var fs = require("fs");
var path = require('path'); //解析需要遍历的文件夹
var filePath = path.resolve('pages')
console.log(555, filePath)
fileDisplay(filePath);

function fileDisplay(filePath) {
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath, function(err, files) {
        console.log(666, err, files)
        if(err) {
            console.warn(err)
        } else {
            //遍历读取到的文件列表
            files.forEach(function(filename) {
                if(filename == '.DS_Store') {
                    return
                }
                console.log(666)
                var s = './pages/' + filename;
                fs.readdir(s, function(err, filesList) {
                    if(err) {
                        console.warn(err)
                    } else {
                        //读取每个文件
                        for(var i = 0; i < filesList.length; i++) {
                            getfileList(s + '/' + filesList[i], s, filename)
                        }
                    }
                });
            });
        }
    });
}

function getfileList(flieName, ord, filename) {
    fs.readFile(flieName, 'utf8', function(err, data) {
        if(err) {
            console.warn(err)
        } else {
            //html部分转换
            if(flieName.indexOf("wxml") != -1) {
                var dataName = '<template><div>' + data;
                replaceHtml(dataName, ord, flieName, filename)
            }
            //css部分抓获
            if(flieName.indexOf("wxss") != -1) {
                replaceCss(data, ord, flieName, filename)
            }
        }
    });
}

function replaceCss(fileContent, fileUrl, s, fileName) {
    var str = fileContent;
    str = str.replace(/image/g, 'img');
    str = str.replace(/navigator/g, 'a');
    str = str.replace(/\d+rpx/g, function(a, b, c, d, e, f) {
        return(parseInt(a) / 75).toFixed(2) + 'rem';
    });
    var s = '<style scoped>' + str + '</style>';
    fs.writeFileSync(fileUrl + '/' + fileName + '.css', s);
}

function replaceHtml(fileContent, fileUrl, s, fileName) {
    var str = fileContent;
    str = str.replace(/image/g, 'img');
    str = str.replace(/view/g, 'div');
    str = str.replace(/text/g, 'span');
    str = str.replace(/bindtap/g, '@onclick');
    str = str.replace(/block/g, 'template');
    str = str.replace(/wx:if/g, 'v-show');
    str = str.replace(/src=\'\{\{/g, ":src='");
    str = str.replace(/wx\:key=\"\*this\"/g, ' ');
    str = str.replace(/wx\:key\=\"index\"/g, ' ');
    str = str.replace(/navigator/g, 'router-link');
    str = str.replace(/wx:for="{{/g, 'v-for= "(item,index) in ');
    str = str.replace(/url\=\'..\//g, "to='");
    str = str.replace(/bindinput/g, '@input');

    //图片路径替换
    str = str.replace(/..\/..\/imgs/g, function(a, b, c, d, e, f) {
        return '../assets';
    });
    //rpx转rem
    str = str.replace(/\d+rpx/g, function(a, b, c, d, e, f) {
        return(parseInt(a) / 75).toFixed(2) + 'rem';
    });

    str += '</div>'
    str += '</template>';
    str += '<script>' + 'import vue from "vue"' + 'var vm = vue;' + 'export default {' + 'name:"' + fileName + '",' + ' data() {return {}}, ' + 'methods: {} ' + '}' + '</script>';
    //新建文件
    fs.writeFileSync(fileUrl + '/' + fileName + '.vue', str);
}

var __main = function() {

}

__main()
