import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { Redirect } from 'react-router';
import { fetchComment, fetchCreateComment, fetchEditComment  } from '../actions';
import { default as UUID } from "node-uuid";
import { find } from 'lodash';

class CommentCreateEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      author: '',
      body: '',
      id: '',
      parentId: '',
      timestamp: '',
      formValid: false,
      errMsg: '',
      redirect: false,
      category: props.match.params.category || '',
    };

    this.showErrMsg = '';
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submitAction = this.props.fetchCreateComment;
  }

  componentDidMount() {
    this.setState({
      ...this.state,
        parentId: this.props.match.params.postId,
        id: this.props.match.params.commentId,
      });

    if (this.props.match.params.commentId) {
      this.submitAction = this.props.fetchEditComment;
      this.props.fetchComment(this.props.match.params.commentId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.comments.length) {
      const thisComment = find(nextProps.comments, { 'id': this.state.id });
      this.setState({...this.state, ...thisComment});
    }
  }

  handleChange(event) {
    this.setState(
      {[event.target.name]: event.target.value}
    );
  }

  handleSubmit(event) {
    event.preventDefault();

    const commentId = this.state.id ? this.state.id : UUID.v4().substring(0,8),
      commentTimestamp = this.state.timestamp ? this.state.timestamp : Date.now(),
      newComment = {
        ...this.state,
        id: commentId,
        timestamp: commentTimestamp,
      }

    if(this.validateForm(newComment)){
      this.submitAction(newComment)
      .then((post) => this.setState({
        ...this.state,
        ...newComment,
        errMsg: '',
        redirect: true 
      }));
    } else {
      this.setState({ errMsg: 'showErrMsg' });    
    }
  }

  validateForm(newComment) {
    if (newComment.author   !== '' &&
        newComment.body     !== ''){
      return true;
    }
    return;
  }

  render() {

    if (this.state.redirect && this.state.id) {
       return <Redirect to={`/${this.state.category}/${this.state.parentId}`}/>;
    }

    const authorDisabled = this.state.id ? 'disabled' : '';

    return (
      <form onSubmit={this.handleSubmit}>
        <p className={`errMsg ${this.state.errMsg}`}>All fields are mandatory</p>
        <p>Author:</p>
        <input name="author" value={this.state.author} onChange={this.handleChange} className='form-control' disabled={authorDisabled}/>
        <p>Body:</p>
        <textarea name="body" value={this.state.body} onChange={this.handleChange} className='form-control' />
        <br/>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

function mapStateToProps (props) {
  return props;
}

const mapDispatchToProps = { fetchComment, fetchCreateComment, fetchEditComment };

export default CommentCreateEdit = connect(mapStateToProps, mapDispatchToProps)(CommentCreateEdit);