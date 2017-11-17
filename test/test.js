let request = require('request');
var cheerio = require('cheerio');
request('http://music.naver.com', function (error, response, body) {
    let $ = cheerio.load(body);
    $(".album>a").toArray().forEach(function(e){
        console.log(e.children[0].data);
    });
});