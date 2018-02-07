import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { Link } from 'react-router-dom';
import EditPanel from './EditPanel';

class PostsListItem extends Component {

	constructor(props) {
		super(props);
  	}

	render() {
  		return (
  			<div>
  				{this.props && this.props.postItem && this.props.postItem.id &&
				<div className="postListItem">
	        		<h1>
	        			<Link to={`/${this.props.postItem.category}/${this.props.postItem.id}`}>{this.props.postItem.title}</Link>
					</h1>

					<p className="author">{this.props.postItem.author}</p>
					<p>Comments: {this.props.postItem.commentCount}</p>
					<p>Score: {this.props.postItem.voteScore}</p>
					<EditPanel item={this.props.postItem}/>
					<hr/>
				</div>
				}
  			</div>
		);
  }
}

function mapStateToProps (props) {
  return props;
}

export default PostsListItem = connect(mapStateToProps)(PostsListItem);