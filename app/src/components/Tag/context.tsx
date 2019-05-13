import React from "react";
import { withFirebase, IFirebaseProps } from '../Firebase';

export const TagsContext = React.createContext<{ id: string; name: string; }[] |null>(null);

interface Tags {
  tags: {
    id: string;
    name: string;
  }[];
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
      let data: { id: string; name: string; }[];
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