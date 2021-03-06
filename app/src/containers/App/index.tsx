import React from "react";
import { HashRouter, Switch, Route } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

// Components;
import MenuBar from "../../components/MenuBar";
import NavigationBar from "../../components/NavigationBar";

// Containers;
import Board, { predicateCompose }  from '../Board';

import * as ROUTES from "../../constants/routes";
import SignInPage from '../../components/Auth/SignIn';
import { SignUpPage } from 'src/components/Auth/SignUp';
import HomePage from '../Home';
import Search from '../../components/Search'
import { withTags } from 'src/components/Tag';
import { ReviewPredicate } from "../Board";
import { compose } from 'recompose';
import Firebase, { withFirebase } from "../../components/Firebase";

const App = (props: any) => {
  const user = (props.firebase as Firebase)!.auth.currentUser;
  const uid = user ? user.uid : "";
  return (
    <HashRouter>
      <NavigationBar />
      <Container className="full-width">
        <Row className="full-height">
          <Col lg="2" className="pl-0 pr-0 menu-bar-div">
            <MenuBar />
          </Col>
          <Col lg="10" className="pl-5 pr-4 board-div">
            <Switch>
              <Route exact={true} path={ROUTES.HOME} component={HomePage} />
              <Route path={ROUTES.SIGN_IN} component={SignInPage} />
              <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
              <Route
                path={ROUTES.SEARCH}
                component={Search}
                render={(props) =>
                  <Search {...props} />
                }
              />
              <Route
                path={ROUTES.READ}
                render={(props) =>
                  <Board
                    {...props}
                    boardType="Read"
                    boardPredicate={predicateCompose(
                      ReviewPredicate.Auth(uid),
                      ReviewPredicate.Read,
                      ReviewPredicate.Alive)}
                  />}
              />
              <Route
                path={ROUTES.TO_READ}
                render={(props) =>
                  <Board
                    {...props}
                    boardType="ToRead"
                    boardPredicate={predicateCompose(
                      ReviewPredicate.Auth(uid),
                      ReviewPredicate.ToRead,
                      ReviewPredicate.Alive)}
                  />}
              />
              <Route
                path={ROUTES.PINNED}
                render={(props) =>
                  <Board
                    {...props}
                    boardType="Pinned"
                    boardPredicate={predicateCompose(
                      ReviewPredicate.Auth(uid),
                      ReviewPredicate.Pinned,
                      ReviewPredicate.Alive)}
                  />}
              />
              <Route
                path={ROUTES.DELETED}
                render={(props) =>
                  <Board {...props}
                    boardType="Deleted"
                    boardPredicate={predicateCompose(
                      ReviewPredicate.Auth(uid),
                      ReviewPredicate.Deleted
                    )}
                  />}
              />
            </Switch>
          </Col>
        </Row>
      </Container>
    </HashRouter>
  );
};

export default compose(
  withFirebase,
  withTags
)(App);