import React, { Component } from 'react';
import DatePicker from "react-date-picker";
import { reviewEntry } from '../Firebase/reviewEntry';

import { compose } from "recompose";
import { withFirebase } from "../Firebase";

export class PapperEditorBase extends Component {
    constructor(props) {
        super(props);

        /* Set default entry */
        this.state = {
            ...reviewEntry
        };
    }
    

    onSubmit = event => {
        this.props.firebase.makeNewPapperReview({
            ...this.state
        });
    };

    onCalendarChange = time => {
        this.setState({
            "publishDate": time 
        })
    }

    onInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.type === 'checkbox'
            ? target.checked
            : target.value
        this.setState({
            [name]: value
        });
    };

    render() {
        return (
            <div className="container">
                <form onSubmit={this.onSubmit}>
                    <div className="row">
                        Title
                        <input
                        name="title"
                        value={this.state.title}
                        onChange = {this.onInputChange}
                        type="text"
                        placeholder="Title"
                        />
                    </div>
                    <div className="row">
                        Authors
                        <input
                        name="authors"
                        value={this.state.authors}
                        onChange = {this.onInputChange}
                        type="text"
                        placeholder="Authors"
                        />
                    </div>
                    <div className="row">
                        PublishDate
                        <DatePicker
                        name="publishDate"
                        value={this.state.publishDate}
                        onChange = {this.onCalendarChange}
                        />
                    </div>
                    <div className="row">
                        Published Conference or Journal
                        <input
                        name="published"
                        value={this.state.published}
                        onChange = {this.onInputChange}
                        type="text"
                        placeholder="Conference or Journal"
                        />
                    </div>
                    <div className="row">
                        Link
                        <input
                        name="link"
                        value={this.state.link}
                        onChange = {this.onInputChange}
                        type="text"
                        placeholder="Link to the Paper"
                        />
                    </div>
                    <div className="row">
                        <input
                        name="toRead"
                        value={this.state.toRead}
                        checked={this.state.toRead}
                        onChange = {this.onInputChange}
                        type="checkbox"
                        />To Read

                        <input
                        name="pinned"
                        value={this.state.pinned}
                        checked={this.state.pinned}
                        onChange={this.onInputChange}
                        type="checkbox"
                        />Pinned
                    </div>
                    <div>
                        Tags
                        <input
                        name="tags"
                        value={this.state.tags}
                        onChange={this.onInputChange}
                        type="text"
                        placeholder="Tags"
                        />
                    </div>
                    <div className="row">
                        <button
                        type="submit">
                        Done
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

const PapperEditor = compose(
    withFirebase
)(PapperEditorBase);

export default PapperEditor;
