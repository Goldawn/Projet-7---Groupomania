import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import EditProfile from '../EditProfile/EditProfile';
import PostList from '../PostList/PostList';
import CreatePost from '../CreatePost/CreatePost';
import CommentList from '../CommentList/CommentList';
import EditComment from '../EditComment/EditComment';
import EditPost from '../EditPost/EditPost';


const ContainerRouter = ({isAuthenticated, children}) => {

    return <> {
        
        isAuthenticated ? (

            <Router forceRefresh={true}>
                {children}
                <Switch>
                    <Route path="/" exact component={PostList}/>
                    <Route path="/post/:postId/edit" exact component={EditPost}/>
                    <Route path="/post/new" exact component={CreatePost}/>
                    <Route path="/post/:postId" exact component={CommentList}/>
                    <Route path="/post/:postId/comment/:commentId/edit" exact component={EditComment}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/profile/edit" component={EditProfile}/>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/" component= {() => <div>Erreur 404</div>}/>
                </Switch>
            </Router>
    
        ) :
        (

            <Router forceRefresh={true}>
                {children}
                <Switch>       
                    <Route path="/register" exact component={Register}/>
                    <Route path="/register/admin" exact component={Register}/>
                    <Route path="/" component={Login}/>
                </Switch>  
            </Router>
            
        )
    }</>

} 

export default ContainerRouter;