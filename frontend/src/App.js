import { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import CreateComment from './components/CreateComment';
import EditComment from './components/EditComment';
import {DetailPost} from './components/Post';
import EditPost from './components/EditPost';


class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      apiResponse: "",
      isAuthenticated: "",
      auth: ""
   };
  }

  logout() {
    this.setState({isAuthenticated: false})
    return localStorage.removeItem('authToken');

    // redirection
  }

  handleClick() {
    this.logout();
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
    const auth = this.loadData("authToken")
    
    if(!auth) {
      console.log("non authentifié")
      this.setState({isAuthenticated: false})
    }
    else {
      console.log("authentifié")
      this.setState({
        isAuthenticated: true,
        auth: auth
      })
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if(prevState.isAuthenticated !== this.state.isAuthenticated) {
  //     console.log("change of state")
  //   }
  // }

  render() {
    const isAuthenticated = this.state.isAuthenticated;
    if(!isAuthenticated) {
      return(
        <div className="App">
          <h1>Groupomania</h1>
          <Router forceRefresh={true}>     
            <Switch>       
              <Route path="/register" component={Register}/>
              <Route path="/" component={Login}/>
            </Switch>  
          </Router>
        </div>
      )
    }
    else {

      return (
        <div className="App">
          <h1><a href="/">Groupomania</a></h1>
          <p><a href="/login">se connecter</a></p>
          {/* <p><a href="/logout">se déconnecter</a></p> */}
          <button onClick={this.handleClick.bind(this)} >se déconnecter</button>
          <p><a href="/profile">profil</a></p>
          <p><a href="/post/new">créer un post</a></p>

          <Router forceRefresh={true}>
            <Switch>
              <Route path="/" exact component={PostList}/>
              <Route path="/post/:postId/edit" component={EditPost}/>
              <Route path="/post/new" component={CreatePost}/>
              <Route path="/post/:postId/comment/:commentId/edit" component={EditComment}/>
              <Route path="/post/:postId/comment/new" component={CreateComment}/>
              <Route path="/post/" component={DetailPost}/>
              <Route path="/login" component={Login}/>
              <Route path="/register" component={Register}/>
              <Route path="/profile/edit" component={EditProfile}/>
              <Route path="/profile" component={Profile}/>
              <Route path="/" component= {() => <div>Erreur 404</div>}/>
            </Switch>
          </Router>
        </div>
      )
    }
  }
}

export default App;