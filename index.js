const Discord = require('discord.js');
//const {prefix, token} = require('./config.json');
const client = new Discord.Client();
var prefix = ("an!");

client.on('ready', ()=> {
	console.log("bitch lasagna");
	client.user.setPresence({
		status: 'dnd',
		activity: {
			name: "there is never too much anime",
			type: 'CUSTOM_STATUS'
		}
	})
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
		.setTitle("Ooo, an invite.")
		.setURL('https://discord.com/oauth2/authorize?client_id=756263075010576456&permissions=1073802352&scope=bot')
		.setDescription("click the blue title to invite me to your server, and thank you!")
		.setThumbnail('https://media.discordapp.net/attachments/744573479751254087/757867650931097600/pog.gif')
		message.channel.send(inviteEmbed)
	}
});
client.login('NzU2MjYzMDc1MDEwNTc2NDU2.X2PS3w.7I5GJTTQzXZOr4wrgzu3Wr0Z1Is');