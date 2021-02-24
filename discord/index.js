require('dotenv').config()
const requireAll = require('require-all');   
const Discord = require('discord.js')
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })

const files = requireAll({                   
  dirname: `${__dirname}/events`,            
  filter: /^(?!-)(.+)\.js$/                  
});                                          

client.removeAllListeners();                                                                                                   
for (const name in files) {                  
  const event = files[name];                 
                                             
  client.on(name, event.bind(null, client))
                                             
  console.log(`Event loaded: ${name}`)
}     

client.on('disconnect', () => {
    client.destroy()
})

client.login('token-here')