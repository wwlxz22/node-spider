var http = require("http"),
    url = require("url"),
    superagent = require("superagent"),
    cheerio = require("cheerio"),
    async = require("async"),
    fs = require('fs'),
    request = require('request'),
    eventproxy = require('eventproxy');
var ep = new eventproxy(),
    urlsArray = [], //存放爬取网址
    pageUrls = [],  //存放收集文章页面网站
    pageNum = 200;  //要爬取文章的页数

for (var i = 0; i < 10; i++) {
    pageUrls.push('http://www.boc.cn/sourcedb/whpj/' + i + '.html');
}

function start() {
    var arrays = [];
    pageUrls.forEach(pageUrl => {
        superagent.get(pageUrl)
            .end(function (err, pres) {
                console.log(pres.text)
                var $ = cheerio.load(pres.text);
                var table = $('table');
                console.log(table.text());
                var lis = $('tr', table);
                lis.each((j, li) => {
                    let food_type = $('td').text();
                    console.log(food_type);
                })
                // fs.writeFile('json.txt', JSON.stringify(arrays));
            });
    });
}
start();