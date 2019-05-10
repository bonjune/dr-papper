import React from "react";
import { HashRouter, Switch, Route } from 'react-router-dom';

// Components;
import MenuBar from "../../components/MenuBar";
import NavigationBar from "../../components/NavigationBar";
import TagBar from '../../components/TagBar';

// Containers;
import Board, { BoardPredicate } from '../Board';

import * as ROUTES from "../../constants/routes";


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

export default App;