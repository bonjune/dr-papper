import React from "react";
import * as ROUTES from "../../constants/routes";
import './index.css';
import { Link } from 'react-router-dom';
import { AuthUserContext, withAuthentication } from '../Auth/Session';
import SignOut from '../Auth/SignOut';
import SearchBar from './SearchBar';

const NavigationBar = () => (
  <AuthUserContext.Consumer>
    {authUser => authUser ? <NavBarForAuth /> : <NavBarForNonAuth />}
  </AuthUserContext.Consumer>
);

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
        <Link to={ROUTES.READ}>
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