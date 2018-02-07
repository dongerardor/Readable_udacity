import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import EditPanel from './EditPanel';

class Comment extends Component {

  constructor(props) {
    super(props);
    this.itemId = props.comment.id;
  }

  formatDate(timestamp){
    const postCreatedDate = new Date(timestamp);
    return (postCreatedDate.getMonth() + 1) + '/' + postCreatedDate.getDate() + '/' +  postCreatedDate.getFullYear();
  }

  render() {
    return (
      <div className="comment">
        <p className='commentDate'>Commented on {this.formatDate(this.props.comment.timestamp)} by {this.props.comment.author}</p>
        <p className='commentBody'>{this.props.comment.body}</p>
        <h6>Votes: {this.props.comment.voteScore}</h6>
        <EditPanel item={this.props.comment}/>
        <hr/>
      </div>  
    );
  }
}

function mapStateToProps (props) {
  return props;
}

export default Comment = connect(mapStateToProps)(Comment);