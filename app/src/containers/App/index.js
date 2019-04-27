import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom'


// Components
import MenuBar from "../../components/MenuBar"
import NavigationBar from "../../components/NavigationBar"
import TagBar from '../../components/TagBar'

// Containers
import ReadBoard from "../ReadBoard"
import ToReadBoard from "../ToReadBoard"

// Test Code
import Test from "../../components/Tests"

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
            <BrowserRouter>
                <div className="container">
                    <NavigationBar />
                    <div className="row">
                        <div className="col-sm-1">
                        <MenuBar />
                        </div>
                        <div className="col-sm-11">
                        <TagBar />
                        <Switch>
                            <Route exact path='/read' component={ReadBoard} />
                            <Route path='/unread' component={ToReadBoard} />
                        </Switch>
                        </div>
                    </div>
                </div>
                <hr/>
                <div>
                    <Test/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;