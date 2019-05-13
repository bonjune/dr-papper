import React, { Component } from 'react'
import { compose } from "recompose";
import ReactAutocomplete from 'react-autocomplete';
import { withRouter } from 'react-router-dom';
import {
  InputGroup,
  Button
} from 'reactstrap';
import { TagsContext } from 'src/components/Tag';
import { RouterProps } from 'react-router';

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
              <Button color="secondary" onClick={this.onSearchClick}>
                search
              </Button>
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
