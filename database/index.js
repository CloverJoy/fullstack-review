const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = new mongoose.Schema({
  // TODO: your schema here!
  name: String,
  url: String,
  score: Number //watchers + forkcount
});

let Repo = mongoose.model('Repo', repoSchema);


let save = (repos) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  Repo.insertMany(repos, error => {} );
  Repo.find({score: 0}, (error, data) => {
    console.log(data);
  });
}

module.exports.save = save;