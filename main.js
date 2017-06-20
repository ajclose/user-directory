const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
const data = require('./data.js')

const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')
app.use(express.static(__dirname + '/public'));


app.get('/users/', function (req, res) {
  const users = data.users
  res.render('index', {users: users})
})

app.get('/users/:id', function (req, res) {
  const id = req.params.id
  const user = data.users[id-1]
  res.render('user', {user: user})
})

app.listen(3000, function () {
  console.log('Successfully started express application!');
})
