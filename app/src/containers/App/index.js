import React, { Component } from "react";
import { HashRouter, Switch, Route } from 'react-router-dom';

// Components;
import MenuBar from "../../components/MenuBar";
import NavigationBar from "../../components/NavigationBar";
import TagBar from '../../components/TagBar';

// Containers;
import ReadBoard from "../ReadBoard";
import ToReadBoard from "../ToReadBoard";

import * as ROUTES from "../../constants/routes";

// Test Code;
import Test from "../../components/Tests";

const INITIAL_STATE = {
    "boardMode": "to-read",
}
class App extends Component {
    constructor(props) {
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
                            <Route exact path={ROUTES.HOME} component={ReadBoard} />
                            <Route path={ROUTES.TO_READ} component={ToReadBoard} />
                        </Switch>
                        </div>
                    </div>
                </div>
                <hr/>
                <div>
                    <Test/>
                </div>
            </HashRouter>
        );
    }
}

export default App;