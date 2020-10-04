const Discord = require('discord.js');
//const {prefix, token} = require('./config.json');
const client = new Discord.Client();
var prefix = ("an!");
let statusChoice = ['om', 'jessser where is your holy text', 'in development', 'how about no luv'];

client.on('ready', ()=> {
	console.log("bitch lasagna");
	setInterval(function(){
		let displayedStatus = statusChoice[Math.floor(Math.random()*statusChoice.length)];
		client.user.setPresence({
			status: 'idle',
			activity:{
				name: displayedStatus
			}
		})
	},20000)
});

client.on('message', async message =>{
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	function userMention(mention)
	{
		if (!mention) return;

		if (mention.startsWith('<@')&& mention.endsWith('>'))
		{
			mention = mention.slice(2,0);
		}

		return client.users.cache.get(mention)
	}

	if (command === 'ping')
	{
		var ping = Date.now() +message.createdTimestamp;
		var ping1 = Math.round(ping);
		message.reply(`nice, your ping is: ${ping1}ms`);
	}

	else if (command === 'server')
	{
		const serverEmbed = new Discord.MessageEmbed()
		.setColor('#990000')
		.setTitle(`server name: ${message.guild.name}`)
		.setDescription(`this server has ${message.guild.memberCount}\n and was created on ${message.guild.createdAt}\n I joined this awesome place on ${message.guild.joinedAt}`)
		.addField({
			name: "owner is:",
			value: `${message.guild.owner.name}`
		})
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
		.setColor('#990000')
		.setTitle("prefix is an!")
		.setImage('https://media.discordapp.net/attachments/296056831514509312/691239396715790376/image0-5-1.gif')
		.addFields(
			{
				name: "moderation",
				value: "kick (kicks @ user) \n ban (bans @ user)",
				inline: true
			},

			{
				name: "entertainment:",
				value: "say: repeats the user's desired message and deletes it \n bigtext: does the same but with those weird blue emoji letters",
				inline: true
			},

			{
				name: "info",
				value: "server: returns details on server. \n user-info: returns some handy dandy information on you!",
				inline: false
			}
		)
		.setFooter(`hope you found this helpful ${message.author.tag}`)
		message.channel.send(helpEmbed);
	}

	else if (command === 'user-info')
	{
		let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
		
		let status;
		switch (user.presence.status)
		{
			case "online":
				status = "<:online:729181184193462285> online";
				break;
			case "dnd":
				status = "<:dnd:729181212530442311> dnd";
				break;
			case "idle":
				status = "<:idle:729181121933475931> idle";
				break;
			case "offline":
				status = "<:offline:729181162182017051> offline";
				break;
		}

		const userEmbed = new Discord.MessageEmbed()
		.setColor('#990000')
		.setTitle(`${user.user.username}'s stats`)
		.setThumbnail(user.user.displayAvatarURL({dyname: true}))
		.addFields(
			{
				name: "name",
				value: user.user.username,
				inline: true
			},
			{
				name: "user's current status",
				value: status,
				inline: true
			},

			{
				name: "discriminator: ",
				value: `${user.user.discriminator}`,
				inline: true
			},

			{
				name: "user iD",
				value: user.user.id,
				inline: true
			},
			{
				name: "user Joined at: ",
				value: user.joinedAt.toLocaleDateString("en-us"),
				inline: true
			},
			{
				name: 'users roles: ',
				value: user.roles.cache.map(role => role.toString()).join(" ,"),
				inline: true
			}
		)

		await message.channel.send(userEmbed)
	}

	else if (command === 'invite')
	{
		const inviteEmbed = new Discord.MessageEmbed()
		.setColor('#990000')
		.setTitle("Ooo, an invite.")
		.setURL('https://discord.com/oauth2/authorize?client_id=756263075010576456&permissions=1073802352&scope=bot')
		.setDescription("click the blue title to invite me to your server, and thank you!")
		.setThumbnail('https://media.discordapp.net/attachments/744573479751254087/757867650931097600/pog.gif')
		message.channel.send(inviteEmbed)
	}

	else if (command === 'kick') 
	{
		if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('no perms luv')
		let User = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
		if (!User) return message.channel.send("who we kicking cheif")
		let kickReason = args.join(" ").slice(22);
		if (!kickReason) {
			Reason = "None"
		}
		User.kick({reason: kickReason})	

	}

	else if (command === 'ban') 
	{
		if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('no perms luv')
		let User = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
		if (!User) return message.channel.send("who we kicking cheif")
		let kickReason = args.join(" ").slice(22);
		if (!kickReason) {
			Reason = "None"
		}
		User.ban({reason: kickReason})	

	}

});
client.login(process.env.BOT_TOKEN);
