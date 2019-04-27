import React, { Component } from 'react';
import { reviewEntry } from '../Firebase/reviewEntry';

import { compose } from "recompose";
import { withFirebase } from "../Firebase";

export class PapperEditorBase extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        console.log(props.firebase);
    }

    makeSubmitEntry = () => ({
        "reviewId ": "",
        "userId ": "defaultUser",
    
        // Time Stamp
        "createAt": new Date().now(),
        "updateAt": new Date().now(),
    
        // Basic Information
        "title ": this.state.title,
        "authors": this.state.author,
        "publishDate ": this.state.publishDate,
        "published ": this.state.published,
        "link": this.state.link,
    
        // State
        "toRead": true,
        "pinned": false,
        "trash": false,
    
        // Tags
        "tags": [
            {
                "key": "",
                "name": "",
            }
        ],
    
        // Note
        "comment": "",
        "boxes": [
            {
                "box": "",
                "format": "",
                "figure": "",
                "subtitle": "",
                "content": "",
            }
        ],
    });

    onSubmit = event => {
        const {
            title,
            author,
            publishDate,
            published,
            link
        } = this.state;
        this.props.firebase.makeNewPapperReview({
            title,
            author,
            publishDate,
            published,
            link
        });
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

        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input
                    name="title"
                    value={title}
                    onChange = {this.onInputChange}
                    type="text"
                    placeholder="Title"k
                    />
                    <input
                    name="author"
                    value={author}
                    onChange = {this.onInputChange}
                    type="text"
                    placeholder="Author"
                    />
                    <input
                    name="publishDate"
                    value={publishDate}
                    onChange = {this.onInputChange}
                    type="text"
                    placeholder="Publish Date"
                    />
                    <input
                    name="published"
                    value={published}
                    onChange = {this.onInputChange}
                    type="text"
                    placeholder="Published Conference Or Journal"
                    />
                    <input
                    name="link"
                    value={link}
                    onChange = {this.onInputChange}
                    type="text"
                    placeholder="Link to the Paper"
                    />
                    <button
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
