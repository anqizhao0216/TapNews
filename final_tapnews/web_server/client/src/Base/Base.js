import React from 'react';
import Auth from '../Auth/Auth';
import PropTypes from 'prop-types';
import UserDropDown from '../UserDropDown/UserDropDown'
import SearchForm from '../SearchForm/SearchForm'
import NewsTabs from '../NewsTabs/NewsTabs'
import { Link } from 'react-router';
import './Base.css'

const Base = ({ children }) => (
  <div>
    <nav className="nav-extended grey darken-4">
      <div className="nav-wrapper">
        <a href="/" className="brand-logo">Tap News</a>
        <ul id="nav-mobile" className="right">
          {Auth.isUserAuthenticated() ?
            (
              <div>
                <li><SearchForm /></li>
                <li><a className="dropdown-button" data-activates="userDropDown" data-beloworigin="true">{Auth.getEmail()}</a></li>
              </div>
            )
            :
            (
              <div>
                <li>{Auth.getEmail()}</li>
              	<li><a className="dropdown-button hide" data-activates="userDropDown" data-beloworigin="true" >{Auth.getEmail()}</a></li>
                <li><Link to="/login">Log in</Link></li>
                <li><Link to="/signup">Sign up</Link></li>
              </div>
            )
            }
            <UserDropDown />
        </ul>
      </div>
      <div className="nav-content">
        <NewsTabs />
      </div>
    </nav>
    <br/>
    <br/>
    {children}
  </div>
);

Base.propTypes = {
  children: PropTypes.object.isRequired
};

export default Base;
