/**
 * Author: Bongjun Jang
 */

import React from "react";

import { IReview } from "../../../components/Firebase/interface"
import { TestImage } from "../../../assets/img";
import SmallTag from "../../../components/Tag";

interface ICardProps {
  title: string;
  imgShow: boolean;
  summary: string;
  tags: string[];
}

interface ICardBoxProps {
  reviews: IReview[];
  imgShow: boolean;
  cardPredicate: (review: IReview) => boolean;
}

export const CardPredicate = {
  Pinned: (review: IReview) => review.pinned,
  Archived: (review: IReview) => !review.pinned,
}

const papperview = () => {
}

class Card extends React.Component<ICardProps> {
  render() {
    return (
      <div className="col-sm-4 box papper-card" onClick={papperview}>
        {this.props.imgShow ? <img src={TestImage} alt="testimage"/> : <div/>}
        <p className="title font-weight-normal">
          <div className="ellipse">
            {this.props.title}
          </div>
        </p>
        <p className="content font-weight-light multi-ellipse">
          {this.props.summary}
        </p>
        <section className="card-tags">
          {this.props.tags.map(tag => (
            <SmallTag tagName={tag} />
          ))}
        </section>
      </div>
    )
  }

}

class CardBox extends React.Component<ICardBoxProps, any> {
  reviews: IReview[]
  constructor(props: ICardBoxProps) {
    super(props);
  }

  render() {
    const { cardPredicate, imgShow } = this.props;
    const reviews = this.props.reviews.filter(cardPredicate);
    return (
      <div>
        {reviews.map(review =>
          <Card
            imgShow={imgShow}
            title={review.title}
            summary={review.comment}
            tags={review.tags.map(tag => tag.name)}
          />
        )}
      </div>
    )
  }
}

export default CardBox;