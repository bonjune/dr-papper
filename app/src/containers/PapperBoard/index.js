import React, { Component } from "react";
import FinnedBox from './FinnedBox'
import TagBar from './TagBar'

class PapperBoard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container-papper-board">
                <TagBar />
                <FinnedBox />
            </div>
        );
    }

}

export default PapperBoard;