import React from "react";
import { compose } from 'recompose';
import { withFirebase, IFirebaseProps } from '../Firebase';
import { ITag } from '../Firebase/interface';
import SmallTag from '../Tag'

class TagBarBase extends React.Component<IFirebaseProps, {tags: string[]}> {
  tags: firebase.database.Reference
  constructor(props: IFirebaseProps) {
    super(props)
    this.state = {
      tags: []
    }
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
      tags: data
    }));
    
  }
  render() {
    this.listTags();
    return (
      <section className="component-tag-bar" style={{minHeight: "80px", marginTop: "10px"}}>
        <div>
          <div className="sm-12">
            <div className="tag-bar-list">
              {this.state.tags.map((tagName, i) => (
                <SmallTag
                  key={`tagbar-tag-${i}`}
                  tagName={tagName}
                />
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