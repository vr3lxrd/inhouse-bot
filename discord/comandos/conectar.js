const Discord = require('discord.js')
const client = new Discord.Client()
const fetch = require('node-fetch')

exports.run = async (client, message, args) => {

    if (args.length != 1) {
        return message.channel.send('Use: -conectar SEU-NICK-NO-LOL (espaços separados por traços mesmo)')
    }

    let userInformation = () => {
        return {
            'discordId': message.author.id,
            'discordName': message.author.username
        }
    }
    let user = userInformation()
    let lolUser = args[0].replace(/-/g," ")  
    let data = await fetch('http://localhost:3000/users').then(response => response.json())
    let bool = false
    data.forEach(element => {
        if (user.discordId === element.discordId){
            bool = true
        }
    })
    if (bool) {
        return message.channel.send(`Esse usuário já cadastrou a conta: ${lolUser}!`)
    }
    
    let newUser = {
        'discordId': user.discordId,
        'discordName': user.discordName,
        'lolName': args[0],
        'mmr': 1000
    }

    fetch('http://localhost:3000/register', { method: 'POST', body: JSON.stringify(newUser), headers: { 'Content-Type': 'application/json' } })
        .then(res => res.json())
        .then(json => console.log(json))
    
    message.channel.send(`Usuário "${lolUser}" cadastrado!`)

}