import React from "react";
import SmallTag, { TagsContext } from '../Tag'
import { withFirebase } from "../Firebase";
import { IReview } from '../Firebase/interface';
import { Tag } from "../Tag/context";
import { ReviewPredicate } from 'src/containers/Board';

interface ITagBarProps {
  reviews: IReview[];
  uid: string;
}

class TagBarBase extends React.Component<ITagBarProps> {
  constructor(props: any) {
    super(props)
  }
  /**
   * Sorry for nasty code!
   */
  tagPredicate = (tag: Tag, reviews: IReview[], uid: string) => (
    reviews ? reviews.filter(ReviewPredicate.Auth(uid)).map((review) => {
      
      if (review.tags) {
        for (let index = 0; index < review.tags.length; index++) {
          const tagName = review.tags[index].name;
          if (tag.name === tagName)
            return true;
        }
      }
      return false;
      // review.tags.includes({id: tag.key, name: tag.name})  
    }).reduce((prev, curr) => (curr || prev), false) : null
  )
  
  render() {
    const { uid, reviews } = this.props;
    return (
      <TagsContext.Consumer>
        {tags => (
          <section className="component-tag-bar" style={{ marginTop: "10px", marginBottom: "20px" }}>
            <div>
              <div className="sm-12">
                <div className="tag-bar-list">
                  {tags ? tags.filter((tag) => this.tagPredicate(tag, reviews, uid))
                    .map((tag, i) => (
                    <SmallTag
                      key={`tagbar-tag-${i}`}
                      tagName={tag.name}
                    />
                  )) : null}
                </div>
              </div>
            </div>
        </section>)}
      </TagsContext.Consumer>
    )
  }
}

const TagBar = withFirebase(TagBarBase);

export default TagBar;