import React from 'react';
import ReactDom from 'react-dom';
import './index.css'
import { browserHistory, Router } from 'react-router';
import routes from './routes';

import 'materialize-css/dist/css/materialize.min.css';
// import 'materialize-css/dist/js/materialize.js';

window.$ = window.jQuery = require('../node_modules/jquery/dist/jquery.js');
require('materialize-css/dist/js/materialize.min.js');

ReactDom.render(
  <Router history={browserHistory} routes={routes} />,
 document.getElementById('root')
);
