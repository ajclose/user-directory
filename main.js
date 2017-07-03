const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient
const url = 'mongodb://localhost:27017/robots';


const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')
app.use(express.static(__dirname + '/public'));

// app.use(function(req, res, next) {
//   MongoClient.connect(url, function(err, db) {
//     if (err) {
//       throw err;
//     } else {
//       console.log('Successfully connected to the database');
//     }
//     const data = require("./data");
//     const users = data.users
//     for (var i = 0; i < data.users.length; i++) {
//       const user = data.users[i];
//       db.collection("users").updateOne(
//         {id: user.id},
//         user,
//         {upsert: true}
//   )
//     }
//   })
//   next()
// })


app.get('/users', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) {
      throw err;
    } else {
      console.log('Successfully connected to the database');
    }
    db.collection('users')
    .find()
    .toArray( function(err, documents) {
      res.render('index', {
        users: documents})
    })
})
})

app.get('/users/:id', function (req, res) {
  const userId = parseInt(req.params.id)
  MongoClient.connect(url, function(err, db) {
    if (err) {
      throw err;
    } else {
      console.log('Successfully connected to the database');
    }

  db.collection("users").findOne({id: userId}, function(err, document) {
    res.render('user', {
      user: document
    })
  })
    })


    })

    app.get('/unemployed', function(req, res) {
      MongoClient.connect(url, function(err, db) {
        if (err) {
          throw err;
        } else {
          console.log('Successfully connected to the database');
        }
        db.collection("users")
        .find({"job": null})
        .toArray(function(err, documents) {
          res.render('index', {
            users: documents
          })
        })
    })
  })

  app.get('/employed', function(req, res) {
    MongoClient.connect(url, function(err, db) {
      if (err) {
        throw err;
      } else {
        console.log('Successfully connected to the database');
      }
      db.collection("users")
      .find({"job": {$nin: [null]}})
      .toArray(function(err, documents) {
        res.render('index', {
          users: documents
        })
      })
  })
})







app.listen(3000, function () {
  console.log('Successfully started express application!');
})
