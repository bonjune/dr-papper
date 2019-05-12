import React from "react";
import { HashRouter, Switch, Route, withRouter } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

// Components;
import MenuBar from "../../components/MenuBar";
import NavigationBar from "../../components/NavigationBar";
import TagBar from '../../components/TagBar';

// Containers;
import Board, { BoardPredicate } from '../Board';

import * as ROUTES from "../../constants/routes";
import SignInPage from '../../components/Auth/SignIn';
import { SignUpPage } from 'src/components/Auth/SignUp';
import HomePage from '../Home';
import { compose } from 'recompose';
import { AuthUserContext, withAuthentication } from "../../components/Auth/Session";
import ShowSearch from '../../components/ShowSearch'


const INITIAL_STATE = {
    "boardMode": "to-read", // Usage?
}

class App extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
    this.state = {
      ...INITIAL_STATE,
    };
  }

  render() {
    return (
        <HashRouter>
          <NavigationBar />
          <AuthUserContext.Consumer>
            {authUser => authUser ? <AppForAuth/> : <AppForNonAuth/>}
          </AuthUserContext.Consumer>
        </HashRouter>
    );
  }
}

/**
 * App for un-authorised users
 * 
 * 1. Provides SignInForm (with SignUpLink)
 * 2. Provides Non-functional Navigation Bar (implemented in NavigationBar component)
 */
const AppForNonAuthBase = () => (
  <Switch>
    <Route exact={true} path={ROUTES.HOME} component={HomePage}/>
    <Route exact={true} path={ROUTES.SIGN_IN} component={SignInPage}/>
    <Route exact={true} path={ROUTES.SIGN_UP} component={SignUpPage}/>
  </Switch>
)

const AppForNonAuth = compose(
  withRouter
)(AppForNonAuthBase);

/**
 * App for authorised users
 */
const AppForAuthBase = () => (
    <Container className="full-width">
      <Row>
        <Col sm="2">
          <MenuBar />
        </Col>
        <Col sm="10">
          <TagBar />
          <Switch>
            <Route
              exact={true}
              path={ROUTES.HOME}
              render={(props) => <HomePage />}
            />
            <Route
              exact={true}
              path={ROUTES.READ}
              render={(props) => <Board {...props} boardPredicate={BoardPredicate.Read} />}
            />
            <Route
              path={ROUTES.TO_READ}
              render={(props) => <Board {...props} boardPredicate={BoardPredicate.ToRead} />}
            />
            <Route path={ROUTES.SIGN_IN} component={SignInPage}/>
            <Route path={ROUTES.SIGN_UP} component={SignUpPage}/>
            <Route path={ROUTES.SHOW} component ={ShowSearch} />
          </Switch>
        </Col>
      </Row>
    </Container>
)

const AppForAuth = compose(
  withRouter
)(AppForAuthBase);

export default withAuthentication(App);