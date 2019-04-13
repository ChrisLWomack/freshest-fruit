const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = 'mongodb+srv:cwomack:fruit@freshest-jshgj.mongodb.net/test?retryWrites=true';
const dbName = "freshest";

app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  //console.log(db)
  db.collection('fruits').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {fruits: result})
  })
})

app.post('/fruits', (req, res) => {
  db.collection('fruits').save({fruit: req.body.fruit, origin: req.body.origin, description: req.body.description, pic: req.body.pic, thumbUp: 0}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/fruits', (req, res) => {
  db.collection('fruits')
  .findOneAndUpdate({fruit: req.body.fruit}, {
    $set: {
      thumbUp:req.body.thumbUp + 1
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/fruits', (req, res) => {
  db.collection('fruits').findOneAndDelete({fruit: req.body.fruit}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
