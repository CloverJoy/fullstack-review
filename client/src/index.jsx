import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
    this.getUpdatedData = this.getUpdatedData.bind(this);

  }

  getUpdatedData() {
    axios.get('/repos')
    .then((response) => {
      console.log(response.data);
      let newrepos = [...this.state.repos];
      newrepos = [... response.data];
      this.setState({repos: newrepos});
      console.log(this.state.repos);
    })
  }

  search (term) {
    console.log(`${term} was searched`);
    //this.getUpdatedData();
    axios.post('/repos', {user: term})
      .then((response) => {
        // this will return array of repository name from mongodb
        console.log(`Response is ${response}`);
        this.getUpdatedData();

      })
      .catch((error) => console.log(error));


    // setTimeout(() => {
    //   console.log("Fired in 2 seconds");
    //   this.getUpdatedData();
    // }, 2000);
  }

  componentDidMount() {
   this.getUpdatedData();
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));