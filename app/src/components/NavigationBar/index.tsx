import React from "react";
import * as ROUTES from "../../constants/routes";
import './index.css';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import { AuthUserContext, withAuthentication } from '../Auth/Session';
import SignOut from '../Auth/SignOut';
import SearchBar from './SearchBar';

const NavigationBar = () => (
  <AuthUserContext.Consumer>
    {authUser => authUser ? <NavBarForAuth /> : <NavBarForNonAuth />}
  </AuthUserContext.Consumer>
);

const NavBarForNonAuth = () => (
  <Row className="navBar">
    <Col lg="2">
      <div className="logoBox">
        <div className="logoText">
          <Link to={ROUTES.HOME}>
            Dr.Papper
          </Link>
        </div>
      </div>
    </Col>
    <Col lg="8">
      <div className="searchBox">
        <SearchBar />
      </div>
    </Col>
    <Col lg="1">
      <div className="userBox">
        <div className="userText">
          USER
        </div>
      </div>
    </Col>
    <Col lg="1">
      <div className="settingBox">
        <div className="settingText">
          SETTING
        </div>
      </div>
    </Col>
  </Row>
)

const NavBarForAuth = () => (
  <Row className="navBar">
    <Col lg="2">
      <div className="logoBox">
        <div className="logoText">
          <Link to={ROUTES.READ}>
            Dr.Papper
          </Link>
        </div>
      </div>
    </Col>
    <Col lg="8">
      <div className="searchBox">
        <SearchBar />
      </div>
    </Col>
    <Col lg="1">
      <div className="userBox">
        <div className="userText">
          USER
        </div>
      </div>
    </Col>
    <Col lg="1">
      <div className="settingBox">
        <div className="settingText">
          <SignOut/>
        </div>
      </div>
    </Col>
  </Row>
)
export default withAuthentication(NavigationBar);