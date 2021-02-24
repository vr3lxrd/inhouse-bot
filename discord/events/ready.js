module.exports = (client) => {
    console.log('Conectado')
    client.user.setActivity('Jogos horripilantes', {type: 'WATCHING'})
}