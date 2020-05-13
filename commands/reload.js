module.exports = {
	name: 'reload',
	description: 'Reloads a command',
	args: true,
	execute(message, args) {
        if(!args.length){
            message.channel.send('Você precisa por o comando que deseja recarregar depois de !reload')
        }else{
            const commandName = args[0].toLowerCase();
            const command = message.client.commands.get(commandName)
                || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    
            if (!command) {
                return message.channel.send(`Não há comando com esse nome: \`${commandName}\`, ${message.author}!`);
            }
    
            delete require.cache[require.resolve(`./${command.name}.js`)];
    
            try {
                const newCommand = require(`./${command.name}.js`);
                message.client.commands.set(newCommand.name, newCommand);
                message.channel.send(`O comando \`${command.name}\` foi recarregado!`);
            } catch (error) {
                console.log(error);
                message.channel.send(`Parece que houve um erro ao recarregar esse comando: \`${command.name}\`:\n\`${error.message}\``);
            }
        }
	},
};