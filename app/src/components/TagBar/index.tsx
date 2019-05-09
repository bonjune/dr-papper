import React from "react";
import { compose } from 'recompose';
import { withFirebase, IFirebaseProps } from '../Firebase';
import { ITag } from '../Firebase/interface';

class TagBarBase extends React.Component<IFirebaseProps, string[]> {
  tags: firebase.database.Reference
  constructor(props: IFirebaseProps) {
    super(props)
    this.state = []
    this.tags = this.props.firebase.tags();
  }

  listTags = async () => {
    let data = [] as string[];
    await this.tags.once('value')
      .then(snapshot => {
        snapshot.forEach((child) => {
          data.push((child.val() as ITag).name);
        })
      })
    
    this.setState(() => ({
      ...data
    }));
    
  }
  render() {
    this.listTags();
    return (
      <section className="component-tag-bar">
        <div className="container">
          <div className="sm-12">
            <div className="tag-bar-list">
              {this.state.map((tagName) => (
                <span className="badge badge-light font-weight-normal">
                  {tagName}
                </span>
                ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

}

const TagBar = compose(
  withFirebase
)(TagBarBase);

export default TagBar;