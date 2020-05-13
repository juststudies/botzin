const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file=>file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

const config = require('./config.json');

client.once('ready', ()=>{
    console.log('Bot rodando!');
});

client.on('message', message => {
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	const args = message.content.slice(config.prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if(!client.commands.has(command)){
        return message.channel.send('conheço esse ae não');
    }     
    
    try {
        client.commands.get(command).execute(message, args);
    } catch (err) {
        console.log(err);
        message.reply('Parece que houve algum problema em executar esse comando')
    }
	
});
client.login(config.token)