const fs = require('fs');

module.exports = {
    name:'delete',
    description:'deleta um comando',
    usage:'!delete nome_do_comando',
    execute(message, args){
        if(!args.length){
            message.channel.send('Você deve me dizer qual comando você quer deletar... desse jeito:\n'+
            '!delete teste');
        }else{
            const path = `./commands/${args}.js`
            if(path){
                fs.unlinkSync(path);
                message.channel.send(`Prontim! o comando !${args} foi deletado!`);
            }
                        
        }
    }
}