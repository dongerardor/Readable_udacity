import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { Redirect } from 'react-router';
import { fetchDeleteComment } from '../actions';
import { Link } from 'react-router-dom';

class CommmentDelete extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){
    if(this.props.match.params.commentId){
      this.props.fetchDeleteComment(this.props.match.params.commentId);
    }
  }

  render() {
    return (
      <div>
        <p>This comment has been deleted</p>
        <Link to="/">OK</Link>
      </div>
    );
  }
}

function mapStateToProps (props) {
  return props;
}

const mapDispatchToProps = { fetchDeleteComment };

export default CommmentDelete = connect(mapStateToProps, mapDispatchToProps)(CommmentDelete);