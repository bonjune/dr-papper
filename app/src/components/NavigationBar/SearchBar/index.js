import React, { Component } from 'react';
import { compose } from "recompose";
import { withRouter } from 'react-router';
import { WithContext as ReactTags } from 'react-tag-input';
import { withFirebase } from '../../Firebase';
import './style.css'
import {
    InputGroup,
    Button
} from 'reactstrap';

const KeyCodes = {
    comma: 188,
    enter: 13,
  };
   
const delimiters = [KeyCodes.comma, KeyCodes.enter];

export class SearchBarBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
        tags: [],
        suggestions: []
    };
    this.props.firebase.tags()
      .once('value').then(async snapshot => {
        let raw = snapshot.val();
        var result = [];
        var keys = Object.keys(raw);
        keys.forEach(function(key){
            result.push(raw[key]);
        });

        // to Json
        result.map((val) => {
            var aJson = new Object();
            aJson.id = val.key;
            aJson.text = val.name;
            this.state.suggestions.push(aJson);
        });
    })

    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
}

handleDelete(i) {
    const { tags } = this.state;
    this.setState({
     tags: tags.filter((tag, index) => index !== i),
    });
}

handleAddition(tag) {
    this.setState(state => ({ tags: [...state.tags, tag] }));
}

handleDrag(tag, currPos, newPos) {
    const tags = [...this.state.tags];
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    this.setState({ tags: newTags });
}

handleClick = () => {
    console.log(this.state.tags);
    let str = '';
    this.state.tags.map((val, key) => {
        if(key == 0){str = val.text}
        else str = str + '&' + val.text});
    console.log(str);
    // const { value } = this.state;
    this.props.history.push(`/show/${str}`);
    this.setState({tags: []})
    // window.location.reload();
}

render() {
    const { tags, suggestions } = this.state;
    return (
        <InputGroup style={{marginTop: "13px"}}>
            <ReactTags tags={tags}
                suggestions={suggestions}
                handleDelete={this.handleDelete}
                handleAddition={this.handleAddition}
                handleDrag={this.handleDrag}
                delimiters={delimiters}
                minQueryLength = {1}
                autocomplete={true} />
          <span><Button color="secondary" onClick={this.handleClick}>search</Button></span>
        </InputGroup>
    )
}

}

const SearchBar = compose(
  withRouter,
  withFirebase
)(SearchBarBase)

export default SearchBar