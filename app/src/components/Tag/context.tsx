import React from "react";
import { withFirebase, IFirebaseProps } from '../Firebase';

export const TagsContext = React.createContext<Tag[] | null>(null);

export interface Tag {
    key: string;
    name: string;
    reviews: string[];
}

interface Tags {
  tags: Tag[];
}

export const withTags = (Component: React.ComponentType) => {
  class WithTags extends React.Component<
    IFirebaseProps, Tags> {
    constructor(props: IFirebaseProps) {
      super(props);
      this.state = {
        tags: []
      }
    }
    componentDidMount() {
      let data: Tag[];
      this.props.firebase.tags().on('value', snapshot => {
        data = [];
        if (snapshot) {
          snapshot.forEach(child => {
            data.push(child.val());
          })
        }
        this.setState((current) => ({
          ...current,
          tags: data
        }));
      })
    }
    render() {
      return (
        <TagsContext.Provider value={this.state.tags}>
          {<Component {...this.props} />}
        </TagsContext.Provider>
      )
    }
  }

  return withFirebase(WithTags);
}