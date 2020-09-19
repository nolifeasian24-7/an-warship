const Discord = require('discord.js');
const {prefix, token} = require('./config.json');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});
client.on('message', message => {
	if (message.content === (`${prefix}ping`))//basic discord ping.
	{
		message.reply(`poggers`);
	}
	
	else if (message.content === `${prefix}server`)//server info
	{
		const serverEmbed = new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle(`Server name: ${message.guild.name}`)
		.setURL('https://www.bing.com/videos/search?q=rick+roll&ru=%2fvideos%2fsearch%3fq%3drick%2broll%26FORM%3dHDRSC4&view=detail&mid=091FA92F76455AE19086091FA92F76455AE19086&&FORM=VDRVSR')
		.setDescription(`there are: ${message.guild.memberCount}members`)
		.setThumbnail('https://cdn.discordapp.com/emojis/745144695214047233.gif?v=1')
		.setFooter(`this server was made on ${message.guild.createdAt}`)
		message.channel.send(serverEmbed)
	}

	else if (message.content === `${prefix}user-info`)//user info
	{
		const avatarEmbed = new Discord.MessageEmbed()
		.setTitle("About you")
		.setDescription(`your name is ${message.author.username} \n your discriminator is ${message.author.discriminator}\n and your user id is ${message.author.id} \n you formed your account on ${message.author.createdAt}`)
		.setTimestamp()
		message.channel.send(avatarEmbed)
	}

	else if (message.content === `${prefix}help`)//help embed
	{
		const helpEmbed = new Discord.MessageEmbed()
		.setThumbnail('https://cdn.discordapp.com/attachments/386241122357477376/738846814786289844/unknown.png')
		.setTitle('prefix is !an')
		.setFooter("I was joint developed by Ethan405#3242 and Am1_mk4#2087")
		.setDescription(`ping: returns pong \n user-info: returns your user info \n server: display's server information \n hope you found this helpful ${message.author.username}`)
		message.channel.send(helpEmbed)
	}
});
client.login(process.env.NzU2MjYzMDc1MDEwNTc2NDU2.X2PS3w._Vkc0DlXTbWMziog8MCvXqSmxoM);