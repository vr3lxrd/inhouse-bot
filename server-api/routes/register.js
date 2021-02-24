var express = require('express')
var router = express.Router()



router.post('/', (async(req,res) => {
    const MongoClient = require('mongodb').MongoClient
    MongoClient.connect(process.env.DB_HOST, { useUnifiedTopology: true }, (err, client) => {
    let db = client.db('inhouse_players')
    let data = req.body
    try{
        db.collection('players').insertOne({
            'discordId': data.discordId,
            'discordName': data.discordName,
            'lolName': data.lolName,
            'mmr': data.mmr
        })
        return res.json({"status": "200"})
    }
    catch(e){}
  })
  
    
}))

module.exports = router