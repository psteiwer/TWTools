const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./DiscordBot.json");
var utils = require("./ScavengingCalculator.js");

function logMessageIn(message) {
	// Writes useful info about the message to the output device
	date = new Date();
	console.log(date.toString());
	console.log("User: "+message.author.username+" ("+message.author.id+")");
	console.log("Sever: "+message.channel.guild.name+" ("+message.channel.guild.id+")");
	console.log("Channel: "+message.channel.name);
	console.log("Received: "+message.content);
	console.log("");
}

function logMessageOut(message) {
	date = new Date();
	console.log(date.toString());
	console.log("Sent: "+message);
	console.log("");
}

function sendMessage(message,text) {
	message.channel.send(text);
	logMessageOut(text);
}

client.on("ready", () => {
  console.log("Ready");
});

client.on("message", (message) => {
	if(message.author.bot) return;
	var msg = message.content;
	if (((message.channel.guild.id!='456152753144856580') || (message.channel.name!='scavenge-calculator')) && (message.channel.guild.id!='456997367464591360')) {
		return;
	}
	
	logMessageIn(message);
	
	var expr = /(A|B|C|D){1,4}\s\d*[/]\d*[/]\d*[/]\d*/i;
	if (msg.match(expr)) {
		msg = msg.split(" ");
		sendMessage(message,msg);
		missions=msg[0].split("");
		troops=msg[1].split("/");
		res=utils.calcExternal(msg[0].toLowerCase().includes('a'),msg[0].toLowerCase().includes('b'),msg[0].toLowerCase().includes('c'),msg[0].toLowerCase().includes('d'),troops[0],troops[1],troops[2],troops[3]);
		sendMessage(message,res);
	} else if (msg=='!help') {
		messageText = "Expected format is 'abcd 0/0/0/0'." +
				"\n'abcd' is any combination of missions that you would like to scavenge with." +
				"\n'0/0/0/0' are the number of troops you would like to send in total." +
				"\nTroop order is spear/sword/axe/heavy cavalry.";
		sendMessage(message,messageText);
	} else {
		sendMessage(message,"Sorry, wrong format. Type !help for format info.");
	}
    
});

client.login(config.token);