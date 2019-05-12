import React, { Component } from "react";
import {
    InputGroup,
    Input,
    Button } from 'reactstrap';

import * as ROUTES from "../../constants/routes";
import './index.css';
import { Link } from 'react-router-dom';
import { AuthUserContext, withAuthentication } from '../Auth/Session';
import SignOut from '../Auth/SignOut';
import SearchBar from './SearchBar';
import { func } from 'prop-types';

class NavigationBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => authUser ? <NavBarForAuth/> : <NavBarForNonAuth/>}
      </AuthUserContext.Consumer>
    );
  }
}

const NavBarForNonAuth = () => (
  <div className="navBar">
    <div className="logoBox">
      <div className="logoText">
        <Link to={ROUTES.HOME}>
          Dr.Papper
        </Link>
      </div>
    </div>
    <div className="componentBox">
      <div className="searchBox">
      <SearchBar />
      </div>
      <div className="infoBox">
        <div className="userBox">
          <div className="userText">
            USER
          </div>
        </div>
        <div className="settingBox">
          <div className="settingText">
            SETTING
          </div>
        </div>
      </div>
    </div>
  </div>
)

const NavBarForAuth = () => (
  <div className="navBar">
    <div className="logoBox">
      <div className="logoText">
        <Link to={ROUTES.HOME}>
          Dr.Papper
        </Link>
      </div>
    </div>
    <div className="componentBox">
      <div className="searchBox">
      <SearchBar />
      </div>
      <div className="infoBox">
        <div className="userBox">
          <div className="userText">
            USER
          </div>
        </div>
        <div className="settingBox">
          <div className="settingText">
            <SignOut/>
          </div>
        </div>
      </div>
    </div>
  </div>
)
export default withAuthentication(NavigationBar);