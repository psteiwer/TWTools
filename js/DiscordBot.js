const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./DiscordBot.json");
var utils = require("./ScavengingCalculator.js");


client.on("ready", () => {
  console.log("Ready");
});

client.on("message", (message) => {
	if(message.author.bot) return;
	var msg = message.content;
	if (((message.channel.guild.id!='456152753144856580') || (message.channel.name!='scavenge-calculator')) && (message.channel.guild.id!='456997367464591360')) {
		return;
	}
	console.log("Message from: "+message.author.username+" ("+message.author.id+") @ "+message.channel.guild.name+" ("+message.channel.guild.id+") "+" - "+message.channel.name);
	
	var expr = /(A|B|C|D){1,4}\s\d*[/]\d*[/]\d*[/]\d*/i;
	if (msg.match(expr)) {
		msg = msg.split(" ");
		message.channel.send(msg);
		missions=msg[0].split("");
		troops=msg[1].split("/");
		console.log(missions);
		res=utils.calculate(msg[0].includes('a'),msg[0].includes('b'),msg[0].includes('c'),msg[0].includes('d'),troops[0],troops[1],troops[2],troops[3]);
		console.log(res);
		message.channel.send(res);
	} else if (msg=='!help') {
		message.channel.send("Expected format is 'abcd 0/0/0/0'." +
				" 'abcd' is any combination of missions that you would like to scavenge with." +
				" '0/0/0/0' are the number of troops you would like to send in total." +
				" Troop order is spear/sword/axe/heavy cavalry.");
	} else {
		message.channel.send("Sorry, wrong format. Type !help for more info.");
	}
    
});

client.login(config.token);