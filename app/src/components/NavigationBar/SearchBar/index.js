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
          let raw = snapshot.val();
          var result = [];
          var keys = Object.keys(raw);
          keys.forEach(function(key){
              result.push(raw[key]);
          });

          // to Json
          result.map((val, key) => {
            var aJson = new Object();
            aJson.id = key;
            aJson.label = val.name;
            this.state.items.push(aJson);
          });
      })  
  }

  _handleKeyPress = e => {
    if(e.key === 'Enter'){
      console.log('enter');
    }
  }

  click = e => {
    console.log(this.state.value);
    const { value } = this.state;
    this.props.history.push(`/show/${value}`);
    window.location.reload();
  }

  keyPress(e){
    if(e.keyCode == 13){
       console.log('value', e.target.value);
       // put the login here
    }
  }
  change = e => {
    if(e.keyCode == 13){
      click();
    } else {
      this.setState({value : e.target.value})
    }
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
        style={{ backgroundColor: highlighted ? '#eee' : 'transparent', zIndex: '15'}}
      >
        {item.label}
      </div>
    }
    value={this.state.value}
    onChange={change}
    onSelect={value => this.setState({ value })}
    // onKeyDown={e => console.log(e.target.value)} 
  />
  <span><Button color="secondary" onClick={this.click}>search</Button></span>
  </InputGroup>
  )
  }
}

const SearchBar = compose(
  withRouter,
  withFirebase
)(SearchBarBase);

export default SearchBar
