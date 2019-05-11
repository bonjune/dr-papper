import React from "react";
import { HashRouter, Switch, Route } from 'react-router-dom';

// Components;
import MenuBar from "../../components/MenuBar";
import NavigationBar from "../../components/NavigationBar";
import TagBar from '../../components/TagBar';

// Containers;
import Board, { BoardPredicate } from '../Board';

import * as ROUTES from "../../constants/routes";
import SignIn from 'src/components/Auth/SignIn';


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
          <div className="container full-width">
            <div className="row">
              <div className="col-md-1-5">
              <MenuBar />
              </div>
              <div className="col-md-10-5">
              <TagBar />
              <Switch>
                <Route
                  exact={true}
                  path={ROUTES.HOME}
                  render={(props) => <Board {...props} boardPredicate={BoardPredicate.Read} />}
                />
                <Route
                  path={ROUTES.TO_READ}
                  render={(props) => <Board {...props} boardPredicate={BoardPredicate.ToRead} />}
                />
              </Switch>
              </div>
            </div>
          </div>
        <hr/>
      </HashRouter>
    );
  }
}

const AppForAuth = () => (
  <div className="app-for-auth">
    <NavigationBar />
      <div className="container full-width">
        <div className="row">
          <div className="col-md-1-5">
          <MenuBar />
          </div>
          <div className="col-md-10-5">
          <TagBar />
          <Switch>
            <Route
              exact={true}
              path={ROUTES.HOME}
              render={(props) => <Board {...props} boardPredicate={BoardPredicate.Read} />}
            />
            <Route
              path={ROUTES.TO_READ}
              render={(props) => <Board {...props} boardPredicate={BoardPredicate.ToRead} />}
            />
          </Switch>
          </div>
        </div>
      </div>
    <hr/>
  </div>
)

const AppForNonAuth = () => (
  <div className="app-for-non-auth">
    <SignIn />
  </div>
)

export default App;