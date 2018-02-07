import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { Link } from 'react-router-dom';
import { fetchPostPostVote } from '../actions';

class EditPanel extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const item = this.props.item;//could be a Post or a Comment
    const itemType = item.parentId ? 'comment' : 'post';
    const category = item.parentId ? this.props.posts.find(post => post.id==item.parentId).category : item.category;

    const path = itemType === 'comment' 
      ? `/${category}/${item.parentId}/comment/${item.id}`
      : `/${category}/${item.id}`;

    return (
      <div>
      {item && item.id &&
        <div className="editPanel">
          <button onClick={() => this.props.vote(itemType, item.id, 'upVote')}>Vote up</button>
          <button onClick={() => this.props.vote(itemType, item.id, 'downVote')}>Vote down</button>
          <button><Link to={`${path}/edit`}>Edit</Link></button>
          <button><Link to={`${path}/delete`}>Delete</Link></button>
        </div>
      }
      </div>
    );
  }
}

function mapStateToProps (props) {
  return props;
}

function mapDispatchToProps(dispatch) {
    return {
      vote: (itemType, itemId, vote) => dispatch(fetchPostPostVote(itemType, itemId, vote)),
  };
}

export default EditPanel = connect(mapStateToProps, mapDispatchToProps)(EditPanel);