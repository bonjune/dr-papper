import React, { Component } from "react";

class MenuBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="component-menu-bar">
                <div className="row text-uppercase">Add</div>
                <div className="row text-uppercase">toread</div>
                <div className="row text-uppercase">read</div>
                <div className="row text-uppercase">tag</div>
                <div className="row text-uppercase">trash</div>
            </div>
        );
    }

}

export default MenuBar;