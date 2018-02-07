import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { fetchCategories } from '../actions'
import { Link, Route, Switch } from 'react-router-dom';
import { find } from 'lodash';

class Categories extends Component {

	constructor(props) {
		super(props);
    	this.state = { 
    		currentCategory: '',
    	};
  	}

	componentDidMount() {
		this.props.fetchCategories();
	}

	componentWillReceiveProps(nextProps){
		const categories = nextProps.categories.map((category) => category.name);
		const categoryLocation = nextProps.location.pathname.split('/')[1];
		let currentCategory = '';
		
		if (categoryLocation === '') {
			currentCategory = 'all';
		} else if (~categories.indexOf(categoryLocation)){
			currentCategory = categoryLocation;
		}

		this.setState({ currentCategory });
	}

	render() {		
		return (
			<div className='container'>
				<ul className='categories'>
					{this.props.categories.map((category) => (
					<li 
						key={category.name}
						className={'categoryButton ' + (this.state.currentCategory === category.name ? ' selected' : '')}
					>

						<Link to={`/${category.name}`}>{category.name}</Link>
					</li>
				  ))}
				  <li
				  		className={'categoryButton ' + (this.state.currentCategory === 'all' ? ' selected' : '')}
				  >
						<Link to="/">All posts</Link>
					</li>
				</ul>
			</div>
		);
	}
}

function mapStateToProps (props) {
  return props;
}

function mapDispatchToProps(dispatch) {
  	return {
    	fetchCategories: () => dispatch(fetchCategories()),
	};
}

export default Categories = connect(mapStateToProps, mapDispatchToProps)(Categories);