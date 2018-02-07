import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { Redirect } from 'react-router';
import { fetchDeletePost } from '../actions';
import { Link } from 'react-router-dom';

class PostDelete extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){
    if(this.props.match.params.postId){
      this.props.fetchDeletePost(this.props.match.params.postId);
    }
  }

  render() {
    return (
      <div>
        <p>This post has been deleted</p>
        <Link to="/">OK</Link>
      </div>
    );
  }
}

function mapStateToProps (props) {
  return props;
}

const mapDispatchToProps = { fetchDeletePost };

export default PostDelete = connect(mapStateToProps, mapDispatchToProps)(PostDelete);