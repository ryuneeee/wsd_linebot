# wsd_linebot
Javascript document type LINE bot with Node.js sandbox VM based.


### Installation
```bash
$ git clone https://github.com/ryuneeee/wsd_linebot
$ cd wsd_linebot
$ npm install
```


### Configuration & start

You can find tokens in [this page](https://developers.line.me/console/)
```bash
$ export CHANNEL_SECRET=YOUR_CHANNEL_SECRET
$ export CHANNEL_ACCESS_TOKEN=YOUR_CHANNEL_ACCESS_TOKENz
$ npm start
```

### Background start
Using forever. (nginx reverse proxy SSL port: 443 -> 3000)
```bash
$ sudo npm install forever --global
$ forever start bin/www
$ ps ax | grep node
 7651 ?        Ssl    0:00 /usr/bin/node /usr/lib/node_modules/forever/bin/monitor bin/www
 7657 ?        Sl     0:00 /usr/bin/node /home/ubuntu/wsd_linebot/bin/www
 7669 pts/0    R+     0:00 grep --color=auto node
```


### Webhook URI
```
https://your.domain.com/bot
```
