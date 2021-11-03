import { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Post from './components/Post';


class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
        fetch("http://localhost:9000/api/posts")
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res }))
  }

  loadData(key) {
    if(localStorage){
        if(key in localStorage) {
            return localStorage.getItem(key);
        }
    } else {
        alert("Web Storage is not supported");
    }
  }

  componentDidMount() {
    this.callAPI();
    const auth = this.loadData("authToken")
    console.log(auth)
  }

  render() {
    return (
      <div className="App">
        <h1>Groupomania</h1>
        {/* <p className="App-intro">{this.state.apiResponse}</p> */}
        <Router forceRefresh={true}>

          <Switch>
            <Route path="/" exact component={Post}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/" component= {() => <div>Erreur 404</div>} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;