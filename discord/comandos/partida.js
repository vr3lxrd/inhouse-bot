const Discord = require('discord.js')
const client = new Discord.Client()
const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')

exports.run = async (client, message, args) => {
    let msg;
    let bool

    class Partida {
        
        constructor() {
            this.partidaPlayers = []
        }

        entrarPartida(lolName, id, name, mmr) {
            bool = false
            this.partidaPlayers.forEach(element => {
                if (id === element.id){
                    bool = true
                }
            })
            if (bool) return message.channel.send('Você já está na fila!')
            this.partidaPlayers.push({name: name, id: id, nickname: lolName})
            message.channel.send(`Novo jogador na fila: ${lolName}!`)
            const embed = new MessageEmbed()
                .setTitle(`Fila atual`)
                .setColor('#0bef17')
            this.partidaPlayers.forEach(element => {
                embed.addField(element.nickname, `Pontuação: ${mmr}` ,false)
            })
            message.channel.send(embed)
        }   

    }

    let criarPartida = () => {
        let actual = new Partida
        message.channel.send('Partida criada com sucesso! Use o comando -partida entrar para entrar na fila!')
        return actual
    }

    let entrarPartida = async () => {
        
        let data = await fetch('http://localhost:3000/users').then(response => response.json())
        data.forEach(element => {
            let lolUser = element.lolName.replace(/-/g," ")
            if (element.discordId === message.author.id){
                let id = element.discordId
                let name = element.discordName
                let mmr = element.mmr
                match.entrarPartida(lolUser, id, name, mmr) 
            }
        })
        
    }

    let finalizarPartida = () => {
        return message.channel.send('f')
    }

    let argIdentifier = {
        'criar': criarPartida,
        'entrar': entrarPartida,
        'finalizar': finalizarPartida
    }

    if (args.length != 1){
        return message.channel.send('Comando inválido! Use -partida entrar / -partida criar')
    }
    let comando = args[0]

    if (comando === 'criar'){
        match = criarPartida()
    }
    else {
        try{
            argIdentifier[comando]()
        }
        catch(e){
            message.channel.send('Comando inválido!')
        }
    }

}