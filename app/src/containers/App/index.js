import React, { Component } from "react";
import { BrowserRouter } from 'react-router-dom'


// Components
import MenuBar from "../../components/MenuBar"
import NavigationBar from "../../components/NavigationBar"
import TagBar from "../../components/TagBar"

// Containers
import PapperBoard from "../PapperBoard"

class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <NavigationBar />
                <MenuBar />
                <TagBar />
                <PapperBoard />
            </div>
        );
    }
}

export default App;