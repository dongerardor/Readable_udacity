import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';


class PostPreview extends Component {

  render() {
    return (
      <div className="post">
        <p>Id</p>
        <p>Timestamp</p>
        <h3>Title</h3>
        <p>Author</p>
        <p>Category</p>
        <p>Vote score (1, 2, 3, -1, etc.)</p>
        <p>deleted (true or false)</p>

        <br>

        <Link to='/post/33'>
          Ir a este post
        </Link>
      </div>
    );
  }
}

export default PostPreview;