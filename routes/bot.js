const express = require('express');
const app = require('../app');
const receiver = app.receiver;
const router = express.Router();

const discordjs = require('discord.js');
const client = new discordjs.Client();
receiver.client = client;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }

    if (msg.content === '!script')
        receiver.reply("http://" + process.env.HOST + "/" + receiver.getCtxId(msg), msg);
    else if(!msg.author.bot)
        receiver.script(msg);

});

client.login(process.env.DISCORD_TOKEN);

module.exports = router;
