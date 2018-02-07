////////////////////////////////////////////////////
//Action constants
////////////////////////////////////////////////////

export const GET_POSTS = "GET_POSTS";
export const GET_POST = "GET_POST";
export const GET_COMMENTS = "GET_COMMENTS";
export const GET_COMMENT = "GET_COMMENT";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_CATEGORY_POSTS = "GET_CATEGORY_POSTS";
export const CREATE_POST = "CREATE_POST";
export const CREATE_COMMENT = "CREATE_COMMENT";
export const EDIT_POST = "EDIT_POST";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_POST = "DELETE_POST";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const POST_POST_VOTE = "POST_POST_VOTE";
export const POST_COMMENT_VOTE = "POST_COMMENT_VOTE";


////////////////////////////////////////////////////
//Action function definitions
////////////////////////////////////////////////////
export const getPosts = posts => ({
  type: GET_POSTS,
  posts
});

export const getPost = post => ({
  type: GET_POST,
  post
});

export const getComments = comments => ({
  type: GET_COMMENTS,
  comments
});

export const getComment = comment => ({
  type: GET_COMMENT,
  comment
});

export const getCategories = categories => ({
	type: GET_CATEGORIES,
	categories
});

export const getCategoryPosts = category => ({
	type: GET_CATEGORY_POSTS,
	category
});

export const createPost = post => ({
  type: CREATE_POST,
  post
})

export const createComment = comment => ({
  type: CREATE_COMMENT,
  comment
})

export const editPost = post => ({
  type: EDIT_POST,
  post
})

export const editComment = comment => ({
  type: EDIT_COMMENT,
  comment
})

export const deletePost = post => ({
  type: DELETE_POST,
  post
})

export const deleteComment = post => ({
  type: DELETE_COMMENT,
  post
})

export const postPostVote = vote => ({
  type: POST_POST_VOTE,
  vote
});

export const postCommentVote = vote => ({
  type: POST_COMMENT_VOTE,
  vote
});



////////////////////////////////////////////////////
////////////////////////////////////////////////////

const headers = {
  'Authorization': 'local_user'
}

export const fetchPosts = () => async dispatch => {
  try {
    const response = await fetch('/posts', { headers });
    const responseBody = await response.json();
    dispatch(getPosts(responseBody));
  } catch (error) {
    console.error(error);
  }
};

export const fetchPost = (postId) => async dispatch => {
  try {
    const url = `/posts/${postId}`;
    const response = await fetch(url, { headers });
    const responseBody = await response.json();
    dispatch(getPost(responseBody));
  } catch (error) {
    console.error(error);
  }
};

export const fetchComments = (postId) => async dispatch => {
  try {
    const response = await fetch(`/posts/${postId}/comments`, { headers });
    const responseBody = await response.json();
    dispatch(getComments(responseBody));
  } catch (error) {
    console.error(error);
  }
};

export const fetchComment = (commentId) => async dispatch => {
  try {
    const url = `/comments/${commentId}`;
    const response = await fetch(url, { headers });
    const responseBody = await response.json();
    dispatch(getComment(responseBody));
  } catch (error) {
    console.error(error);
  }
};

export const fetchCategories = () => async dispatch => {
  try {
  	const response = await fetch('/categories', { headers });
    const responseBody = await response.json();
    dispatch(getCategories(responseBody));
  } catch (error) {
    console.error(error);
  }
};

export const fetchCategoryPosts = (category) => async dispatch => {
	try {
		const url = `/${category}/posts`;
		const response = await fetch(url, {headers});
		const responseBody = await response.json();
		dispatch(getCategoryPosts(responseBody));
	} catch (error) {
		console.error(error);
	}
};

export const fetchCreatePost = (newPost) => async dispatch => {
  try {
    const url = '../posts';
    await fetch(url, 
      {
        method: 'POST',
        headers: {
          'Authorization': 'local_user',
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'id': newPost.id,
          'timestamp': newPost.timestamp,
          'title': newPost.title,
          'body': newPost.body,
          'author': newPost.author,
          'category': newPost.category,
        })
      })
      .then((resp) => resp.json())
      .then(function(data) {
        dispatch(createPost(data));
      })    
  } catch (error) {
      console.error(error);
  }
};

export const fetchCreateComment = (newComment) => async dispatch => {
  try {
    const url = '../../../comments';
    await fetch(url, 
      {
        method: 'POST',
        headers: {
          'Authorization': 'local_user',
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'id': newComment.id,
          'timestamp': newComment.timestamp,
          'body': newComment.body,
          'author': newComment.author,
          'parentId': newComment.parentId,
        })
      })
      .then((resp) => resp.json())
      .then(function(data) {
        dispatch(createComment(data));
      })    
  } catch (error) {
      console.error(error);
  }
};

export const fetchEditPost = (editedPost) => async dispatch => {
  try {
    const url = `../../posts/${editedPost.id}`;
    await fetch(url, 
    {
      method: 'PUT',
      headers: {
        'Authorization': 'local_user',
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'id': editedPost.id,
        'timestamp': editedPost.timestamp,
        'title': editedPost.title,
        'body': editedPost.body,
        'author': editedPost.author,
        'category': editedPost.category,
      })
    })
    .then((resp) => resp.json())
    .then(function(data) {
      dispatch(editPost(data));
    })    
  } catch (error) {
      console.error(error);
  }
};

export const fetchEditComment = (editedComment) => async dispatch => {
  try {
    const url = `/comments/${editedComment.id}`;
    await fetch(url, 
    {
      method: 'PUT',
      headers: {
        'Authorization': 'local_user',
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'timestamp': editedComment.timestamp,
        'body': editedComment.body,
      })
    })
    .then((resp) => resp.json())
    .then(function(data) {
      dispatch(editComment(data));
    })    
  } catch (error) {
      console.error(error);
  }
};

export const fetchDeletePost = (deletedPostId) => async dispatch => {
  try {
    const url = `../../posts/${deletedPostId}`;
    await fetch(url, 
    {
      method: 'DELETE',
      headers: {
        'Authorization': 'local_user',
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then((resp) => resp.json())
    .then(function(data) {
      dispatch(deletePost(data));
    })    
  } catch (error) {
      console.error(error);
  }
};

export const fetchDeleteComment = (deletedCommentId) => async dispatch => {
  try {
    const url = `/comments/${deletedCommentId}`;
    await fetch(url, 
    {
      method: 'DELETE',
      headers: {
        'Authorization': 'local_user',
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then((resp) => resp.json())
    .then(function(data) {
      dispatch(deleteComment(data));
    })    
  } catch (error) {
      console.error(error);
  }
};

//vote is a string ('upVote' or 'downVote')
//We can vote for a Post or a Comment
export const fetchPostPostVote = (itemType, itemId, vote) => async dispatch => {
  const action = itemType === 'post' ? postPostVote : postCommentVote;
  const url = itemType === 'post' ? `/posts/${itemId}` : `/comments/${itemId}`;
  try {
    await fetch(url, 
      {
        method: 'POST',
        headers: {
          'Authorization': 'local_user',
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({'vote': vote })
      })
      .then((resp) => resp.json())
      .then(function(data) {
        dispatch(action(data));
      })    
  } catch (error) {
    console.error(error);
  }
};