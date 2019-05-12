import React from "react";
import { HashRouter, Switch, Route } from 'react-router-dom';
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
import ShowSearch from '../../components/ShowSearch'

const App = () => (
  <HashRouter>
    <NavigationBar />
    <Container className="full-width">
      <Row>
        <Col sm="2">
          <MenuBar />
        </Col>
        <Col sm="10">
          <TagBar />
          <Switch>
            <Route exact={true} path={ROUTES.HOME} component={HomePage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SHOW} component ={ShowSearch} />
            <Route
              path={ROUTES.READ}
              render={(props) => <Board {...props} boardPredicate={BoardPredicate.Read} />}
            />
            <Route
              path={ROUTES.TO_READ}
              render={(props) => <Board {...props} boardPredicate={BoardPredicate.ToRead} />}
            />
            <Route
              path={ROUTES.PINNED}
              render={(props) => <Board {...props} boardPredicate={BoardPredicate.Pinned} />}
            />
            <Route
              path={ROUTES.DELETED}
              render={(props) => <Board {...props} boardPredicate={BoardPredicate.Deleted} />}
            />
          </Switch>
        </Col>
      </Row>
    </Container>
  </HashRouter>
);

export default App;