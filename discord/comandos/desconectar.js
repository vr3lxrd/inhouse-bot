const Discord = require('discord.js')
const client = new Discord.Client()
const fetch = require('node-fetch')

exports.run = async (client, message, args) => {

    let userInformation = () => {
        return {
            'discordId': message.author.id,
            'discordName': message.author.username
        }
    }
    let user = userInformation()
    let data = await fetch('http://localhost:3000/users').then(response => response.json())
    let bool = false
    data.forEach(element => {
        if (user.discordId === element.discordId){
            bool = true
        }
    })
    if (!bool) {
        return message.channel.send(`Esse usuário não possui uma conta cadastrada`)
    }
    
    fetch('http://localhost:3000/desconectar', { method: 'POST', body: JSON.stringify(user), headers: { 'Content-Type': 'application/json' } })
        .then(res => res.json())
        .then(json => console.log(json))
    
    message.channel.send(`Usuário será removido.`)

}