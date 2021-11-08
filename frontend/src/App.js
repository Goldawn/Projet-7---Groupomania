import { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import PostList from './components/PostList';
import Comment from './components/Comment';
import {DetailPost} from './components/Post';


class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      apiResponse: "",
      isAuthenticated: ""
   };
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
    
    if(!auth) {
      console.log("non authentifié")
      this.setState({isAuthenticated: false})
    }
    else {
      console.log("authentifié")
      this.setState({isAuthenticated: true})
    }
  }

  render() {
    const isAuthenticated = this.state.isAuthenticated;
    if(!isAuthenticated) {
      return(
        <div className="App">
          <h1>Groupomania</h1>
          <Router forceRefresh={true}>            
              <Route path="/" component={Login}/>
          </Router>
        </div>
      )
    }
    else {

      return (
        <div className="App">
          <h1>Groupomania</h1>
          {/* <p className="App-intro">{this.state.apiResponse}</p> */}
          <Router forceRefresh={true}>

            <Switch>
              <Route path="/" exact component={PostList}/>
              <Route path="/post/" component={DetailPost}/>
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
}

export default App;