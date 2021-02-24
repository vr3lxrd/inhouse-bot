module.exports = (client, message) => {
    if (message.content.startsWith('-')){ 

        if (message.author.bot) return

        const args = message.content.split(" ")
        args.shift()  

        const commandSplited = message.content.split(" ")[0]
        const command = commandSplited.replace(/^./g,"")
        command.toLowerCase()
        
        try {
            const commandHandler = require(`../comandos/${command}`)
            commandHandler.run(client, message, args) 
        }
        catch {
            message.channel.send('Comando Inválido')
        }
    }
}