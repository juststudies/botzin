const fs = require('fs');
module.exports={
    name: 'make',
    description: 'cria comando',
    execute(message, args){    
        if(!args.length){
            message.channel.send('Você tem que digitar !make nome_do_comando para que ele exista!')
        }else if(args.length > 0){            
            fs.writeFile(`./commands/${args[0]}.js`, `module.exports = {
                name: '${args[0]}',
                url: '${args[1]}',
                execute(message){
                    message.channel.send(this.url);
                }
            }`, (err)=>{
                if(err) throw err;
                message.channel.send(`comando !${args[0]} criado.`);
            });
        }    
    }
        
} 