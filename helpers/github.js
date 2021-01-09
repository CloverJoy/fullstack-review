const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (user, cb) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API
  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${user}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  let data;

  axios.get(options.url, {headers: options.headers})
   .then(res => {
    data = res.data.map(x => {
      let data = {name: x.name, url: x['html_url'], score: x.forks + x.watchers};
      return data;
    })
      // console.log(data);
      cb(data)
      console.log('this is succesfully called');
   })
   .catch(err => console.log(err));
  }


module.exports.getReposByUsername = getReposByUsername;