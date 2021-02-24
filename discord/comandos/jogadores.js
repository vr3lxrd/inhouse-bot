const Discord = require('discord.js')
const client = new Discord.Client()
const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')

exports.run = async (client, message, args) => {

    const embed = new MessageEmbed()
          .setTitle(`Jogadores do Inhouse!`)
          .setColor('#0bef17')
          .setDescription('Lista de jogadores do nosso Inhouse')

    let data = await fetch('http://localhost:3000/users').then(response => response.json())
    data.forEach(element => {
        let lolUser = element.lolName.replace(/-/g," ") 
        embed.addField('Nick no LOL ', lolUser ,true)
        embed.addField('Pontuação ', element.mmr ,true)
        embed.addField('W/L ', 'Em breve' ,true)
    })
    
    message.channel.send(embed)
}