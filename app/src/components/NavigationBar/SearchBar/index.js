import React, { Component } from 'react'
import { withFirebase } from '../../Firebase';
import ReactAutocomplete from 'react-autocomplete';

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

  render() {
  return (
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
  )
  }
}

const SearchBar = withFirebase(SearchBarBase);

export default SearchBar
