import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import PostsList from './PostsList';
import Categories from './Categories';
import Header from './Header';
import Post from './Post';
import PostCreateEdit from './PostCreateEdit';
import PostDelete from './PostDelete';
import CommentCreateEdit from './CommentCreateEdit';
import CommentDelete from './CommentDelete';

class App extends Component {
  render() {
    return (
	  	<div className="App">
				<Header/>
				<Route path="/" component={Categories} />
				<Switch>
					<Route exact path="/:category/new" component={PostCreateEdit} />
					<Route path="/:category/:postId/delete" component={PostDelete} />
					<Route path="/:category/:postId/edit" component={PostCreateEdit} />
					<Route exact path="/:category/:id" component={Post} />
					<Route exact path="/:category/:postId/comment/new" component={CommentCreateEdit}/>
					<Route path="/:category/:postId/comment/:commentId/edit" component={CommentCreateEdit}/>
					<Route path="/:category/:postId/comment/:commentId/delete" component={CommentDelete}/>
					<Route exact path="/" component={PostsList}/>
			    	<Route path="/:category" component={PostsList}/>
				</Switch>
		</div>
    );
  }
}

export default App;