import React from "react";
import { withFirebase } from "../../components/Firebase";

import { compose } from "recompose";
import PapperEditor from "../PapperEditor";

class TestBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <h3>
                    Run Test Code Here!
                </h3>
                <div>
                    <button
                    onClick={this.props.firebase.pushDummyReview}
                    >
                    NEW DUMMY REVIEW
                    </button>
                </div>
                <hr/>
            </div>
        )
    }
}

const Test = compose(
    withFirebase
)(TestBase);

export default Test;