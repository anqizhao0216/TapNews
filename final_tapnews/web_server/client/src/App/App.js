// import 'materialize-css/dist/css/materialize.min.css';
// import 'materialize-css/dist/js/materialize.min.js';

import React from 'react';
import logo from './logo.png';
import './App.css';
import NewsPanel from '../NewsPanel/NewsPanel';

class App extends React.Component{
  render() {
    console.log('in app.js: ' + this.props.params.keyword);
    console.log('in app.js: ' + this.props.params.topic);
    return(
      <div>
        <img className='logo' src={logo} alt='logo'/>
        <div className='container'>
          <NewsPanel topic={this.props.params.topic} keyword={this.props.params.keyword} list={this.props.params.list}/>
        </div>
      </div>
    );
  }
}

export default App;
