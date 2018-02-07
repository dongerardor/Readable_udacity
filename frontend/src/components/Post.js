import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { fetchPost } from '../actions'
import Comments from './Comments'
import EditPanel from './EditPanel'
import { find } from 'lodash';
import { Link } from 'react-router-dom';

class Post extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.postId = this.props.match.params.id;
    this.props.fetchPost(this.postId);
  }

  componentWillReceiveProps(nextProps){
    const thisPost = find(nextProps.posts, {'id': this.postId});
    if (thisPost){
      this.setState({...thisPost});
    }
  }

  formatDate(timestamp){
    const postCreatedDate = new Date(timestamp);
    return (postCreatedDate.getMonth() + 1) + '/' + postCreatedDate.getDate() + '/' +  postCreatedDate.getFullYear();
  }

  render() {
    return (
      <div>
      {this.props.posts === null &&
        <div>
          <h6>This post no longer exists</h6>
          <Link to={'/'}>Continue</Link>
        </div>
      }
      {this.state.id &&
        <div className="post">
          <p className='postDate'>Created on {this.formatDate(this.state.timestamp)} by {this.state.author}</p>
          <h3>{this.state.title}</h3>
          <p className='postBody'>{this.state.body}</p>
          <h6>This post has {this.state.voteScore} votes and {this.state.commentCount} comments</h6>
          <EditPanel item={this.state}/>
          <Link to={`/${this.state.category}/${this.state.id}/comment/new`} className='btn_create'>Add new comment</Link>
          <Comments postId={this.state.id}/>
        </div>
      }
      </div>
    );
  }
}

function mapStateToProps (props) {
  return props;
}

const mapDispatchToProps = { fetchPost };

export default Post = connect(mapStateToProps, mapDispatchToProps)(Post);