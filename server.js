const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

var db;

MongoClient.connect('mongodb://admin229:admin229@ds253960.mlab.com:53960/starwars-quotes', (err, client) => {
  if (err) return console.log(err)
  db = client.db('starwars-quotes') // whatever your database name is
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})



/*
app.listen(3000, function() {
  console.log('listening on 3000')
})
*/

//app.get(path, callback)
/*ap.get('/', function(req, res) {
	res.send('Hello World')
})
*/

/*
app.get('/', (req, res) => {
  res.send('Hello World')
})
*/

/*
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
  // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
})
*/

app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {quotes: result})
  })
})

// Note: request and response are usually written as req and res respectively.

/*
app.post('/quotes', (req, res) => {
  console.log('Hellooooooooooooooooo!')
})
*/

/*
app.post('/quotes', (req, res) => {
  console.log(req.body)
})
*/

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})
