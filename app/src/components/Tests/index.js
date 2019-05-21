import React from "react";
import { withFirebase } from "../../components/Firebase";

import { compose } from "recompose";
import PapperEV from "../PapperEV";

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
    }

    render() {
        return (
            <div>
                <h3>
                    Run Test Code Here!
                </h3>
                <div>
                    <button
                        onClick={() => this.setState({modal:true})}
                    >
                    PapperEV
                    </button>
                    <PapperEV edit={true} toread={true} modalShow={this.state.modal}/>
                </div>
                <hr/>
            </div>
        )
    }
}


export default Test;