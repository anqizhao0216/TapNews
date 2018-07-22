import React, {Component} from 'react';
import { Link, browserHistory } from 'react-router';
import './SearchForm.css';
import PropTypes from 'prop-types';
import Auth from '../Auth/Auth';
// import Form from 'react-router-form';

class SearchForm extends Component {
	constructor() {
		super();
		this.state = {showSearch:false, keyword:''};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event){
		this.setState({keyword: event.target.value});
	}

	render(){
		if(this.state.showSearch){
			return (
				//DONE: add on keydown? or on submit
				<form className="row reset_all" onSubmit={()=>{browserHistory.push('/search/' + this.state.keyword);}}>
					<input placeholder="Keyword" id="keyword" type="text" className="col s8" value={this.state.keyword} onChange={this.handleChange}/>
					<Link className="col s2" to={"/search/" + this.state.keyword}><i className="large material-icons">search</i></Link>
					<a className="col s2" onClick={()=>{this.setState({showSearch:false, keyword:''})}}><i className="large material-icons">clear</i></a>
				</form>

			);
		}else{
			return (
				<div>
					<a className="" onClick={()=>{this.setState({showSearch:true})}}><i className="large material-icons">search</i></a>
				</div>
			);
		}
	}
}

export default SearchForm;
