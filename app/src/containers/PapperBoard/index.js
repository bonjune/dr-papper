import React, { Component } from "react";
import FinnedBox from './FinnedBox'

class PapperBoard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container-papper-board">
                <FinnedBox />
            </div>
        );
    }

}

export default PapperBoard;