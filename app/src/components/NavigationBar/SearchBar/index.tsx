import React, { Component } from 'react'
import { compose } from "recompose";
import ReactAutocomplete from 'react-autocomplete';
import { withRouter } from 'react-router-dom';
import {
  InputGroup,
} from 'reactstrap';
import { TagsContext } from 'src/components/Tag';
import { RouterProps } from 'react-router';
import { SearchIcon } from "../../../assets/icons";

class SearchBarBase extends Component<{ query: string;} & RouterProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      query: '',
    }
  }

  onSearchClick = () => {
    const { query } = this.state;
    this.props.history.push(`/show/${query}`);
  }

  render() {
    return (
      <TagsContext.Consumer>
        {tags => {
          if (tags === null) return;
          const items = tags.map((tag, i) => ({
            id: i,
            label: tag.name
          }));
          
          return (
            <InputGroup style={{ marginTop: "13px" }}>
              <ReactAutocomplete
                items={items}
                shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                getItemValue={item => item.label}
                inputProps = {{style: {width: "100%"}}}
                renderItem={(item, highlighted) =>
                  <div
                    key={item.id}
                    style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}
                  >
                    {item.label}
                  </div>
                }
                value={this.state.query}
                onChange={e => this.setState({ query: e.currentTarget.value })}
                onSelect={query => this.setState({ query })}
              />
              <span>
                <button 
                  style={{border: "none", backgroundColor: "#E3F2FD", marginTop: "5px"}}
                  onClick={this.onSearchClick}>
                  <span><img src={SearchIcon} style={{ height: "20px", width: "20px"}} /></span>
                </button>
              </span>
            </InputGroup>
          )
        }}
      </TagsContext.Consumer>
    );
  }
}

const SearchBar = compose(
  withRouter
)(SearchBarBase);

export default SearchBar
