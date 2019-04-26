import React, { Component } from 'react';
import { reviewEntry } from '../Firebase/reviewEntry';

export class PapperEditorBase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...reviewEntry
        }
    }

    onSubmit = event => {
        this.props.firebase.makeNewPapperReview(this.state);
    };

    onInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        const {
            title,
            author,
            publishDate,
            published,
            link,
        } = this.state;

        const isInvalid =
            title === "" ||
            author === "" ||
            publishDate === "" ||
            published === "";

        return (
            <div>
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
                    <input
                    name="published"
                    value={published}
                    onChange = {this.onInputChange}
                    type="text"
                    />
                    <input
                    name="link"
                    value={link}
                    onChange = {this.onInputChange}
                    type="text"
                    />
                    <button
                    disabled={isInvalid}
                    type="submit">
                    Done
                    </button>
                </form>
            </div>
        )
    }
}

const PapperEditor = compose(
    withFirebase
)(PapperEditorBase);

export default PapperEditor;
