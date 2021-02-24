var express = require('express')
var router = express.Router()

router.post('/', (req,res) => {
    /*
    db.collection('users').find().toArray((err,data) => {
        res.render('pages/users', {
            user: session.id,
            cargo: session.cargo,
            path: 'users',
            page: 'Usuários',
            users: data
        })
    })*/
    res.json({
        "jogador": "jogador"
    })

})

router.get('/', (req,res) => {
    const MongoClient = require('mongodb').MongoClient
    MongoClient.connect(process.env.DB_HOST, { useUnifiedTopology: true }, (err, client) => {
    let db = client.db('inhouse_players')
    try{
        db.collection('players').find().toArray((err,data) => {
            return res.send(data)
        })
        
    }
    catch(e){}
  })
    

})

module.exports = router