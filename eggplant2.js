const Discord = require("discord.js");
const client = new Discord.Client();
const { prefix, token } = require("./eggplantconfig.json");
const admin = ['183724145408737280']; //Put your Discord ID followed by commas, like so: const admin = ['ID', 'ID2'];
const whitelist = ['183724145408737280'] //same as above
const request = require('request-promise');


/////////${client.users.array().length} users playing thing

//these will log on console
//on ready
client.on("ready", () => {
    console.log("+=================================+")
    console.log(`Launched, ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} servers.`);
    console.log("+=================================+")
    client.user.setActivity(`you`, {type:"WATCHING"}); //server count
});
  
//new server
  client.on("guildCreate", guild => {
    console.log("+=================================+")
    console.log(`Joined: ${guild.name} (id: ${guild.id}). This server has ${guild.memberCount} members!`);
    console.log("+=================================+")
    client.user.setActivity(`you`, {type:"WATCHING"}); //server count
});
  
//removed from server
  client.on("guildDelete", guild => {
    console.log("+=================================+")
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`); 
    console.log("+=================================+")
    client.user.setActivity(`you`, {type:"WATCHING"}); //server count
});


//cat fact
async function getCatFact(channel) {
  var options = {

      method: 'GET',
      uri: 'https://catfact.ninja/fact',
      json: true
  }
  let response = await request(options);
  await channel.send(`**Cat Facts 🐱 |** ${response.fact}`);
}

//dog fact
async function getDogFact(channel) {
  var options = {
      method: 'GET',
      uri: 'https://some-random-api.ml/dogfact',
      json: true
  }
  let response = await request(options);
  await channel.send(`**Dog Facts 🐶 |** ${response.fact}`)
}

//kanye quote
async function getKanyeQuote(channel) {
  var options = {
    method: 'GET',
    uri: 'https://api.kanye.rest',
    json: true
  }
  let response = await request(options);
  await channel.send(`👉🏿 **${response.quote}** 👈🏿 ~ *Kanye West*`);
}

//bitcoin
async function getBTC(channel) {
  var options = {
    method: 'GET',
    uri: 'https://api.coinranking.com/v1/public/coin/1',
    json: true
  }
  let response = await request(options);
  await channel.send(`BTC $${response.data.coin.price}`);
}

//drump
async function getTrumpQuote(channel) {
  var options = {
    method: 'GET',
    uri: 'https://api.tronalddump.io/random/quote',
    json: true
  }
  let response = await request(options);
  const trumpemoji = client.emojis.find(emoji => emoji.name === "trump");
  await channel.send(`${trumpemoji} | 👉 ${response.value} 👈 | ${trumpemoji}`);
}

//8ball vars
function get8Ball() {
  var rand = [':8ball: | It is certain',
  ':8ball: | It is decidedly so',
  ':8ball: | Without a doubt',
  ':8ball: | Yes - definitely',
  ':8ball: | You may rely on it',
  ':8ball: | As I see it, yes',
  ':8ball: | Most likely',
  ':8ball: | Outlook good',
  ':8ball: | Yes',
  ':8ball: | Signs point to yes',
  ':8ball: | Reply hazy, try again',
  ':8ball: | Ask again later',
  ':8ball: | Better not tell you now',
  ':8ball: | Cannot predict now',
  ':8ball: | Concentrate and ask again',
  ':8ball: | Don\'t count on it',
  ':8ball: | My reply is no',
  ':8ball: | My sources say no',
  ':8ball: | Outlook not so good',
  ':8ball: | Very doubtful'];
  return rand[Math.floor(Math.random()*rand.length)];
}



//////////
//Actual commands

client.on("message", async message => {
  if(message.author.bot) return; //prevent bot loop
  
  const args = message.content.slice(prefix.length).trim().split(/ +/g); //separate command with arguments for command <!>
  const command = args.shift().toLowerCase();

//dad bot omegalul
  const args2 = message.content.match(new RegExp(`^(?:.*\\s+)?i'?m\\s+(.+)$`, 'i'));
  if(args2) {
    message.channel.send(`Hi ${args2[1]}, I'm Dad!`);
  }

  if(message.content.indexOf(prefix) !== 0) return;
//help thingy
  if (command === "help")
  message.channel.send({embed: {
    color: 3447003,
    title: "Commands",
    description: "Prefix: **-**",
    fields: [
      {
        name: "Command Usage",
        value: "-<command> | ex. `-catfacts`"
      },
      {
        name: "catfacts",
        value: "Displays a random cat fact."
      },
      {
        name: "dogfacts",
        value: "Displays a random dog fact."
      },
      {
        name: "kanye",
        value: "Thank you Kanye, very cool!"
      },
      {
        name: "trump",
        value: "I will build a great, great wall on our southern border, and I will have Mexico pay for that wall. Mark my words."
      },
      {
        name: "8ball",
        value: "Oh almighty ball of truth!"
      },
      {
        name: "flip",
        value: "Flips a coin."
      }
    ],
    footer: {
      text: "Leks#0001"
    }
  }
  });


// BOT UPTIME
let uptime = (client.uptime / 1000);
let daysm = Math.floor(uptime / 86400);
let days = Math.round(daysm);
let hours = Math.floor((uptime % 86400) / 3600);
uptime %= 3600;
let minutes = Math.floor(uptime / 60);
let secondsm = Math.round(uptime *10) / 10;
let seconds = Math.round(secondsm % 60);


//I am not even sure if this works properly.
const heap = process.memoryUsage().heapUsed / 1024 / 1024;
  if (command === "about") 
  message.channel.send({embed: {
    color: 3447003,
    title: "Eggplant",
    description: "Created by Leks. NodeJS. Discord JS lib.",
    fields: [{
        name: "Node Version",
        value: "v8.11.1"
      },
      {
        name: "Uptime",
        value: `${days}D, ${hours}H, ${minutes}M, ${seconds}S`,
      },
      {
        name: "Ram Usage",
        value: `${Math.round(heap * 100) / 100} MB`,
      },
      {
        name: "Users",
        value: `${client.users.size}`,
      },
      {
        name: "Channels",
        value: `${client.channels.size}`,
      },
      {
        name: "Servers",
        value: `${client.guilds.size}`,
      }
    ],
    footer: {
      text: "Leks#0001"
    }
  }
  });


//cat fact
  if (command === "catfacts") {
    let args3 = message.content.substring(1).split(' ');
    let cmd = args3[0];
    args3 = args3.splice(1);
    await getCatFact(message.channel);
  }

//dog fact
  if (command === "dogfacts") {
    let args4 = message.content.substring(1).split(' ');
    let cmd = args4[0];
    args4 = args4.splice(1);
    await getDogFact(message.channel);
  }

//Kanye quote
  if (command === "kanye") {
    let args5 = message.content.substring(1).split(' ');
    let cmd = args5[0];
    args5 = args5.splice(1);
    await getKanyeQuote(message.channel);
  }

//btc
  if (command === "btc") {
    let args6 = message.content.substring(1).split(' ');
    let cmd = args6[0];
    args6 = args6.splice(1);
    await getBTC(message.channel);
  }

//drump
  if (command === "trump") {
    let args7 = message.content.substring(1).split(' ');
    let cmd = args7[0];
    args7 = args7.splice(1);
    await getTrumpQuote(message.channel);
  }

//8ball
  if(command === "8ball") {
    await message.channel.send(`${get8Ball()}, ${message.author}`);
  }

//flip coin
  if(command === "flip"){
    var result = Math.floor((Math.random() * 2) + 1);
    if (result == 1) {
      const flip1 = await message.channel.send("As you throw the coin and look at it spin in the air...");
      flip1.edit(`The coin falls on the floor and reveals it landed on heads.`);
    } else if (result == 2) {
      const flip2 = await message.channel.send("As you throw the coin and look at it spin in the air...");
      flip2.edit(`The coin falls on the floor and reveals it landed on tails.`);
  }

//ping
  }
  if(command === "ping") {
    const m = await message.channel.send("Calculating...");
    m.edit(`Bot ping is ${m.createdTimestamp - message.createdTimestamp}ms. API ping is ${Math.round(client.ping)}ms`);
  }

//say
  if(command === "say") {
    if (whitelist.includes(message.author.id)); else
      return message.reply("Only my master daddy can touch me 😩 🍆");
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); // (needs manage messages permissions to delete)
    message.channel.send(sayMessage);
  }

  if(command === "updateusers") {
    if (admin.includes(message.author.id)); else
    return message.reply("you're not allowed to do that.");
    client.user.setActivity(`${client.users.array().length} users`, {type:"WATCHING"});
    message.reply(`Updated users. Currently watching ${client.users.array().length} users.`);
  }

//purge messages
  if(command === "purge") {
    if (admin.includes(message.author.id)); else
      return message.reply("You do not have permission to use this command.");
    const deleteCount = parseInt(args[0], 10);// get the ammount of messages to delete
    if(!deleteCount || deleteCount < 2 || deleteCount > 100) //literally how many messages, if less than 2, it will only delete it's own message/won't delete any
      return message.reply("You need to specify a value between 2 and 100");

    const fetched = await message.channel.fetchMessages({limit: deleteCount}); //literally deleting messages lel
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`)); //couldn't delete message because...
  }

});

client.login(token)
