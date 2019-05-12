/**
 * Author: Bongjun Jang
 */

import React from "react";

import { IReview } from "../../../components/Firebase/interface"
import { TestImage } from "../../../assets/img";
import SmallTag from "../../../components/Tag";
import { Row, Col } from 'reactstrap';

import PapperView from "../../../components/PapperView";

interface ICardProps {
  imgShow: boolean;
  review: IReview;
}

interface ICardState {
  modalShow: boolean;
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

class Card extends React.Component<ICardProps, ICardState> {
  constructor(props: ICardProps) {
    super(props);
    this.state = {
      modalShow: false,
    }
  }
  papperview = () => {
    this.setState(prevState => ({
      modalShow: !prevState.modalShow,
    }));
  }

  render() {
    return (
      <Col lg="4">
        <div>
          <section className="card-tags">
            <Row>
              <button
                type="button"
                style={{ float: "right", fontSize: "14px" }}
                className="signout-btn btn text-uppercase" >
                Pin
              </button>
              <button
                type="button"
                style={{ float: "right", fontSize: "14px" }}
                className="signout-btn btn text-uppercase" >
                Delete
              </button>
            </Row>
          </section>
        </div>
        <div className="box papper-card" onClick={this.papperview}>
          {this.state.modalShow 
            ? <PapperView
                title={this.props.review.title}
                authors={this.props.review.authors}
                publishDate={this.props.review.publishDate}
                publishedAt={this.props.review.publishedAt}
                link={this.props.review.link}
                toRead={this.props.review.toRead}
                tags={this.props.review.tags.map(tag => tag.name)}
                boxes={this.props.review.boxes}
                comment={this.props.review.comment}

                modalShow={this.state.modalShow}
                toggle={this.papperview}
              /> 
            : null}
          {this.props.imgShow ? <img src={TestImage} alt="testimage"/> : null}
          <p className="title font-weight-normal">
            <div className="ellipse">
              {this.props.review.title}
            </div>
          </p>
          <p className="content font-weight-light multi-ellipse">
            {this.props.review.comment}
          </p>
        </div>
        <div>
          <section className="card-tags">
            {this.props.review.tags.map((tag, i) => (
              <SmallTag index={i} tagName={tag.name} />
            ))}
          </section>
        </div>
      </Col>
    )
  }
}

const CardBox = (props: ICardBoxProps) => {
  const { cardPredicate, imgShow } = props;
  const reviews = props.reviews.filter(cardPredicate);
  return (
    <Row>
      {reviews.map(review =>
        <Card
          review={review}
          imgShow={imgShow}
        />
      )}
    </Row>
  )
}

export default CardBox;