const express = require('express');
let app = express();
const getReposByUsername = require('../helpers/github.js');
const {save, filter} = require('../database/index.js');


app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());

app.post('/repos', function (req, res) {
//  console.log(req.body.user);
 let user = req.body.user
 getReposByUsername.getReposByUsername(user, (result) => {
     console.log(result);
     save(result, (finalresult) => {
       res.send('success');
     });
 });

  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  filter(result => {
    let data = [];
    if (result.length <= 25) {
      for (let each of result) {
        data.push(each)
      }
      console.log('Data is less then 25')
      res.send(data)
    } else {
      for (var i = 0; i < 25; i++) {
        data.push(result[i]);
      }
      console.log('data procceed');
      res.send(data);
    }
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port http://localhost:${port}`);
});

