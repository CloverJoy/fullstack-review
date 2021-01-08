const express = require('express');
let app = express();
const {getReposByUsername} = require('../helpers/github.js');


app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());

app.post('/repos', function (req, res) {
 console.log(req.body.user);
 let user = req.body.user
 let data = getReposByUsername(user);
 console.log(data)
 res.sendStatus(201);
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port http://localhost:${port}`);
});

