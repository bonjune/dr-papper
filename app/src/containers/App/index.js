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
                <div>
                    <NavigationBar />
                    <MenuBar />
                    <TagBar />
                    <Switch>
                        <Route exact path='/' component={ReadBoard} />
                        <Route path='/unread' component={ToReadBoard} />
                    </Switch>
                </div>
                <div>
                    <Test/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;