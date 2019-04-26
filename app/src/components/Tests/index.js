import React from "react";
import { withFirebase } from "../../components/Firebase";

import { compose } from "recompose";

class TestBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onTest = () => {
        const reviews = this.props.firebase.getReviews();
        reviews.once('value').then(
            snapshot => {
                console.log(snapshot.val());
            }
        )
    }

    render() {
        return (
            <div class="test">
                <button onClick={this.onTest}>
                Run Test Code!
                </button>
            </div>
        );
    }
}

const Test = compose(withFirebase)(TestBase);

export default Test;