import React, { Component } from "react";
import { BrowserRouter } from 'react-router-dom'


// Components
import MenuBar from "../../components/MenuBar"
import NavigationBar from "../../components/NavigationBar"

// Containers
import PapperBoard from "../PapperBoard"

class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <NavigationBar />
                    <MenuBar />
                    <PapperBoard />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;