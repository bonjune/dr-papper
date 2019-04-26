import React from "react";
import { withFirebase } from "../../components/Firebase";

import { compose } from "recompose";

class TestBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onSubmit = event => {
        const {
            title,
            author,
            publishDate
        } = this.state;

        this.props.firebase.makeNewPapperReview({
            title,
            author,
            publishDate,
        })
    }

    onInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onTest = () => {
        const reviews = this.props.firebase.getReviews();
        reviews.once('value').then(
            snapshot => {
                console.log(snapshot.val().test);
            }
        )
    }

    render() {
        const {
            title,
            author,
            publishDate,
        } = this.state;

        return (
            <div>
                <h3>
                    Run Test Code Here!
                </h3>
                <div class="test">
                    <button onClick={this.onTest}>
                        Get All Reviews
                    </button>
                    <form onSubmit={this.onSubmit}>
                        <input
                        name="title"
                        value={title}
                        onChange = {this.onInputChange}
                        type="text"
                        />
                        <input
                        name="author"
                        value={author}
                        onChange = {this.onInputChange}
                        type="text"
                        />
                        <input
                        name="publishDate"
                        value={publishDate}
                        onChange = {this.onInputChange}
                        type="text"
                        />
                        <button type="submit">Make New Review</button>
                    </form>
                </div>
            </div>
        )
    }
}

const Test = compose(withFirebase)(TestBase);

export default Test;