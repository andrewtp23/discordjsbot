var Discord = require("discord.js");
var bot = new Discord.Client();
var clever = require("cleverbot.io");
var fs = require("fs");
cbot = new clever("CLEVERBOTID", "CLEVERBOT TOKEN");
bot.login("DISCORD TOKEN");
cbot.setNick("x");
cbot.create(function(err,session){});


let responseObject = JSON.parse(fs.readFileSync('./mybot.json', 'utf8'));

bot.on("message", message => {
  let prefix = "#";

  if(message.author.bot) return;

  if(responseObject[message.content]) {
    message.channel.sendMessage(responseObject[message.content]);
  }
  if(message.content.startsWith(prefix)){
    cbot.ask(message.content, function(err, response) {
      message.channel.sendMessage(response);
    })
  }
});

bot.on('ready', () => {
  console.log('I am ready!');
});

bot.on('error', e => {
  console.error(e);
});
