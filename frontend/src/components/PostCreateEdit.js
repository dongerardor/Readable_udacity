import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { Redirect } from 'react-router';
import { fetchPost, fetchCreatePost, fetchEditPost } from '../actions';
import {default as UUID} from "node-uuid";
import { find } from 'lodash';

class PostCreateEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      author: '',
      body: '',
      category: '',
      id: '',
      timestamp: '',
      title: '',
      formValid: false,
      errMsg: '',
      redirect: false,
    };

    this.showErrMsg = '';
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submitAction = this.props.fetchCreatePost;
  }

  componentDidMount(){
    if(this.props.match.params.postId){
      this.postId = this.props.match.params.postId;
      this.submitAction = this.props.fetchEditPost;
      this.props.fetchPost(this.postId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.postId){
      const thisPost = find(nextProps.posts, {'id': this.postId});
      if (thisPost && thisPost.id !== this.state.id){
        this.setState({...this.state, ...thisPost});
      }
    }
  }

  handleChange(event) {
    this.setState(
      {[event.target.name]: event.target.value}
    );
  }

  handleSubmit(event) {
    event.preventDefault();

    const postId = this.state.id ? this.state.id : UUID.v4().substring(0,8),
      postTimestamp = this.state.timestamp ? this.state.timestamp : Date.now(),
      newPost = {
        ...this.state,
        id: postId,
        timestamp: postTimestamp,
      }

    if(this.validateForm(newPost)){
      this.submitAction(newPost)
      .then((post) => this.setState({
        ...this.state,
        ...newPost,
        errMsg: '',
        redirect: true 
      }));
    } else {
      this.setState({ errMsg: 'showErrMsg' });    
    }
  }

  validateForm(newPost) {
    if (newPost.author   !== '' &&
        newPost.body     !== '' &&
        newPost.category !== '' &&
        newPost.title    !== ''){
      return true;
    }
    return;
  }

  render() {

    if (this.state.redirect && this.state.id) {
       return <Redirect to={`/${this.state.category}/${this.state.id}`}/>;
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <p className={`errMsg ${this.state.errMsg}`}>All fields are mandatory</p>
        <h3>Create new post</h3>
        <p>Category:</p>
        <select value={this.state.category} name='category' onChange={this.handleChange} className='form-control'>
            <option key='no-category' value=''>Select category</option>
          {this.props.categories.map((category) => 
            <option key={category.name} value={category.name}>{category.name}</option>
          )}
        </select>
        <p>Author:</p>
        <input name="author" value={this.state.author} onChange={this.handleChange} className='form-control' />
        <p>Title:</p>
        <input name="title" value={this.state.title} onChange={this.handleChange} className='form-control' />
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

const mapDispatchToProps = { fetchPost, fetchCreatePost, fetchEditPost };

export default PostCreateEdit = connect(mapStateToProps, mapDispatchToProps)(PostCreateEdit);