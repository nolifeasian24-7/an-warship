const Discord = require('discord.js');
//const {prefix, token} = require('./config.json');
const client = new Discord.Client();
var prefix = ("an!");

client.on('ready', ()=> {
	console.log("bitch lasagna");
	client.user.setPresence({
		status: 'idle',
		activity: {
			name: "all hail sky van",
			type: 'PLAYING'
		}
	})
});

client.on('message', async message =>{
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	if (command === 'ping')
	{
		message.reply("fast as fuc boi");
	}

	else if (command === 'server')
	{
		const serverEmbed = new Discord.MessageEmbed()
		.setTitle(`server name: ${message.guild.name}`)
		.setDescription(`this server has ${message.guild.memberCount}\n and was created on ${message.guild.createdAt}`)
		.setThumbnail('https://cdn.discordapp.com/emojis/745144695214047233.gif?v=1')
		.setTimestamp()
		message.channel.send(serverEmbed);
	}
	else if (command === 'say')
	{
		if (!args.length)
		{
			return message.reply("thought you got me, eh...");
		}
		if (message.content.includes('@everyone'||'@here')&& !message.member.hasPermission("MENTION_EVERYONE"))
		{
			return message.reply("you were not supposed to say that :)");
		}
		else 
		{
			message.channel.send(`${args.join(' ')}`)
			message.delete(args)
		}
	}

	else if (command === 'help')
	{
		const helpEmbed = new Discord.MessageEmbed()
		.setTitle("prefix is an!")
		.setDescription(`server: displays server information. \n ping: replies with fast as fuc. \n say: well, it says what you want it to say.\nuser-info: returns some useful info on yourself.`)
		.setFooter(`hope you found this helpful ${message.author.name}`)
		message.channel.send(helpEmbed);
	}

	else if (command === 'user-info')
	{
		var username = message.author.username
		var presence = message.author.presence
		const userEmbed = new Discord.MessageEmbed()
		.setTitle(username)
		.setDescription(`your account was created on${message.author.createdAt}\nwith the discriminator of: ${message.author.discriminator} \nThis is the users full tag: ${message.author.tag}\n is the user a bot:${message.author.bot}`)
		.addField(`Your status is currently set to: ${message.author.status}`)
		.addField(`And you joined ${message.guild.name} on ${message.guild.joinedAt}`)
		.setThumbnail(`${message.author.avatarURL()}`)
		message.channel.send(userEmbed)
		delete username
	}

	else if (command === 'invite')
	{
		const inviteEmbed = new Discord.MessageEmbed()
		.setTitle("Ooo, an invite.")
		.setURL('https://discord.com/oauth2/authorize?client_id=756263075010576456&scope=bot')
		.setDescription("click the blue title to invite me to your server, and thank you!")
		.setThumbnail('https://media.discordapp.net/attachments/744573479751254087/757867650931097600/pog.gif')
		message.channel.send(inviteEmbed)
	}
});
client.login(process.env.BOT_TOKEN);
