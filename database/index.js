const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = new mongoose.Schema({
  // TODO: your schema here!
  name: String,
  url: {type: String, unique: true},
  score: Number //watchers + forkcount
});

let Repo = mongoose.model('Repo', repoSchema);


let save = (repos, cb) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  // const currentRepo = new Repo(repos);
  // Repo.insertMany(repos)
  //   .then((r) => {
  //     console.log('success insert');
  //     Repo.save()
  //       .then((r) => {
  //         console.log('success saved');
  //         Repo.find({})
  //           .then((r) => {
  //             r.map(dat => {console.log(dat._doc)});
  //             let repoList = r.map((dat) => {
  //               return {name: dat._doc.name, url: dat._doc.url, score: dat._doc.score};
  //             });
  //             cb(repoList);
  //           })
  //       })
  //   });
  // currentRepo.save()
  //   .then((result) => {
  //     console.log('success')
  //   });
  // Repo.remove({})
  //   .then((r) => console.log('success'));
  // Repo.insertMany(repos)
  //   .then((r) => console.log('success'));
  Repo.insertMany(repos)
    .then((r) => console.log('insert Success'))
  // Repo.find({}).sort('-score')
  //   .then((result => {
  //     let repoList = result.map((dat) => {
  //       return {name: dat._doc.name, url: dat._doc.url, score: dat._doc.score};
  //     });
  //     console.log('find complete');
  //     cb(repoList);
  //   }))
}

let filter = (cb) => {
  Repo.find({}).sort('-score')
  .then((result => {
    let repoList = result.map((dat) => {
      return {name: dat._doc.name, url: dat._doc.url, score: dat._doc.score};
    });
    console.log('find complete');
    cb(repoList);
  }))
}

module.exports.save = save;
module.exports.filter = filter;