const {prefix} = require('../config.json');

module.exports={
    name: 'help',
    description: 'Comandos disponíveis!',
    execute(message, args){
        const data = [];
        const {commands} = message.client;

        if(!args.length){
            data.push('Aqui está a lista de todos os comandos que possuo!');
            data.push(commands.map(command => command.name).join(', '));

            return message.author.send(data, { split: true }).then(()=>{
                if(message.channel.type === 'dm') return;
                message.reply('Mandei pra você um dm com todos os meus comandos!');
            }).catch(err=>{
                console.log(`Deu ruim :/ ao enviar o dm para ${message.author.tag}\n`, err);
                message.reply('Parece que não posso te mandar um DM');
            });
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(command => command.aliases && command.aliases.includes(name));

        if(!command){
            return message.reply('Parece que esse não é um comando válido');
        }

        data.push(`Name: ${command.name}`);

        if(command.aliases) data.push(`Aliases: ${command.aliases.join(', ')}`);
        
        message.channel.send(data, { split: true });
    }
}