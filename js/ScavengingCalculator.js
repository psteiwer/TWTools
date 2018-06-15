const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./tw-scavenging.json");


function calculate(a, b, c, d, sp, sw, ax, hc) {
	console.log("a: "+a);
	console.log("b: "+b);
	console.log("c: "+c);
	console.log("d: "+d);
	haul=getHaul(sp, sw, ax, hc);
	console.log("haul: "+haul);
	hauls=calculateHauls(haul,a,b,c,d);
	console.log("hauls: "+hauls);
	missionA=[0,0,0,0];
	missionB=[0,0,0,0];
	missionC=[0,0,0,0];
	missionD=[0,0,0,0];
	
	if (a) {
		missionA = calculateTroops(hauls[0],sp,sw,ax,hc)
		sp-=missionA[0];
		sw-=missionA[1];
		ax-=missionA[2];
		hc-=missionA[3];
	}
	
	if (b) {
		missionB = calculateTroops(hauls[1],sp,sw,ax,hc)
		sp-=missionB[0];
		sw-=missionB[1];
		ax-=missionB[2];
		hc-=missionB[3];
	}
	
	if (c) {
		missionC = calculateTroops(hauls[2],sp,sw,ax,hc)
		sp-=missionC[0];
		sw-=missionC[1];
		ax-=missionC[2];
		hc-=missionC[3];
	}
	
	if (d) {
		missionD = calculateTroops(hauls[3],sp,sw,ax,hc)
		sp-=missionD[0];
		sw-=missionD[1];
		ax-=missionD[2];
		hc-=missionD[3];
	}
	
	return [missionA,missionB,missionC,missionD];
}

function calculateHauls(haul,a,b,c,d) {
	sampletotal=0
	if (a) {
		sampletotal=sampletotal+15;
	}
	if (b) {
		sampletotal=sampletotal+6;
	}
	if (c) {
		sampletotal=sampletotal+3;
	}
	if (d) {
		sampletotal=sampletotal+2;
	}
	
	ahaul=0
	bhaul=0
	chaul=0
	dhaul=0
	
	if (a) {
		ahaul=(15/sampletotal)*haul;
	}
	if (b) {
		bhaul=(6/sampletotal)*haul;
	}
	if (c) {
		chaul=(3/sampletotal)*haul;
	}
	if (d) {
		dhaul=(2/sampletotal)*haul;
	}
	
	return [ahaul,bhaul,chaul,dhaul];
}

function getHaul(sp, sw, ax, hc) {
	return (sp*25)+(sw*15)+(ax*10)+(hc*50)
}

function calculateTroops(haul,sp,sw,ax,hc) {
	spCount=0;
	swCount=0;
	axCount=0;
	hcCount=0;
	
	if ((sp*25)>haul) {
		spCount=Math.floor(haul/25);
		sp-=spCount;
		haul-=(Math.floor(haul/25))*25;
	} else {
		spCount=sp;
		haul-=(sp*25);
		sp=0;
	}
	
	if ((sw*15)>haul) {
		swCount=Math.floor(haul/15);
		sw-=swCount;
		haul-=(Math.floor(haul/15))*15;
	} else {
		swCount=sw;
		haul-=(sw*15);
		sw=0;
	}
	
	if ((ax*10)>haul) {
		axCount=Math.floor(haul/10);
		ax-=axCount;
		haul-=(Math.floor(haul/10))*10;
	} else {
		axCount=ax;
		haul-=(ax*10);
		ax=0;
	}
	
	if ((hc*50)>haul) {
		hcCount=Math.floor(haul/50);
		hc-=axCount;
		haul-=(Math.floor(haul/50))*50;
	} else {
		hcCount=hc;
		haul-=(hc*50);
		hc=0;
	}
	
	return [spCount,swCount,axCount,hcCount];
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
	console.log("Message from: "+message.author.username+" ("+message.author.id+") @ "+message.channel.guild.name+" ("+message.channel.guild.id+") "+" - "+message.channel.name);
	
	var expr = /(A|B|C|D){1,4}\s\d*[/]\d*[/]\d*[/]\d*/i;
	if (msg.match(expr)) {
		msg = msg.split(" ");
		message.channel.send(msg);
		missions=msg[0].split("");
		troops=msg[1].split("/");
		console.log(missions);
		res=calculate(msg[0].includes('a'),msg[0].includes('b'),msg[0].includes('c'),msg[0].includes('d'),troops[0],troops[1],troops[2],troops[3]);
		console.log(res);
		message.channel.send(res);
	} else {
		message.channel.send("Sorry, wrong format. Please use 'abcd 0/0/0/0'");
	}
    
});

client.login(config.token);
