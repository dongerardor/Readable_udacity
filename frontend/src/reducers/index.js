import { combineReducers } from 'redux';
import { isEmpty } from 'lodash';

function posts(state = [], action) {
	switch (action.type) {
		case 'GET_POSTS':
			return action.posts;
		case 'GET_CATEGORY_POSTS':
			return action.category;
		case 'GET_POST':
			return isEmpty(action.post) ? null : [action.post];
		case 'CREATE_POST':
		case 'EDIT_POST':
		case 'DELETE_POST':
			return [action.post];
		case 'POST_POST_VOTE':
			const newState = state.map((post) => {
				return post.id === action.vote.id ? action.vote : post
			});
			return newState;
		default:
			return state;
	}
}

function categories(state = [], action) {
	switch (action.type) {
		case 'GET_CATEGORIES':
			return action.categories.categories;
		default:
			return state;
	}
}

function comments(state = [], action) {
	switch (action.type) {
		case 'GET_COMMENTS':
			return action.comments;
		case 'GET_COMMENT':
		case 'CREATE_COMMENT':
		case 'DELETE_COMMENT':
			return [action.comment];
		case 'POST_COMMENT_VOTE':
			const newState = state.map((comment) => {
				return comment.id === action.vote.id ? action.vote : comment
			});
			return newState;
		default:
			return state;
	}
}

export default combineReducers({
	categories,
	posts,
	comments,
});