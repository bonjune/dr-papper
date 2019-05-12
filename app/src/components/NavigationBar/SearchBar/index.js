import React, { Component } from 'react'
import { compose } from "recompose";
import { withFirebase } from '../../Firebase';
import ReactAutocomplete from 'react-autocomplete';
import { withRouter, Link } from 'react-router-dom';
import {
  InputGroup,
  Input,
  Button
} from 'reactstrap';

class SearchBarBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      items: [],
    }
    this.props.firebase.tags()
      .once('value').then(async snapshot => {
        const result = [];
        await snapshot.forEach((child, i) => {
          const data = child.val();
          result.push({
            id: i,
            label: data.name
          });
        });
        this.setState(current => ({
          ...current,
          items: result
        }));
      })  
  }

  _handleKeyPress = e => {
    if(e.key === 'Enter'){
      console.log('enter');
    }
  }

  onSearchClick = e => {
    console.log(this.state.value);
    const { value } = this.state;
    this.props.history.push(`/show/${value}`);
    window.location.reload();
  }

  render() {
  return (
    <InputGroup style={{marginTop: "13px"}}>
      <ReactAutocomplete
        items={this.state.items}
        shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
        getItemValue={item => item.label}
        renderItem={(item, highlighted) =>
          <div
            key={item.id}
            style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
          >
            {item.label}
          </div>
        }
        value={this.state.value}
        onChange={e => this.setState({ value: e.target.value })}
        onSelect={value => this.setState({ value })}
        onKeyPress={this._handleKeyPress}
      />
      <Button color="secondary" onClick={this.onSearchClick}>
        search
      </Button>
  </InputGroup>
  )
  }
}

const SearchBar = compose(
  withRouter,
  withFirebase
)(SearchBarBase);

export default SearchBar
