# wsd_linebot
Javascript document type LINE bot with Node.js sandbox VM based.


### Installation
```bash
$ git clone https://github.com/ryuneeee/wsd_linebot
$ cd wsd_linebot
$ apt install build-essential
$ apt install mongodb
$ npm install
```


### Configuration & start

You can find tokens at [this page](https://developers.line.me/console/)
```bash
$ export LINE_BOT_ADDR=your.domain.com
$ export CHANNEL_SECRET=YOUR_CHANNEL_SECRET
$ export CHANNEL_ACCESS_TOKEN=YOUR_CHANNEL_ACCESS_TOKEN
$ npm start
```

### Background start
Using forever.
```bash
$ sudo npm install forever --global
$ forever start bin/www
$ ps ax | grep node
 7651 ?        Ssl    0:00 /usr/bin/node /usr/lib/node_modules/forever/bin/monitor bin/www
 7657 ?        Sl     0:00 /usr/bin/node /home/ubuntu/wsd_linebot/bin/www
 7669 pts/0    R+     0:00 grep --color=auto node
```

### Tests
You can testing using mocha
```bash
$ npm test
```

### Webhook URI
nginx reverse proxy SSL port: 443 -> 3000
```
https://your.domain.com/bot
```
