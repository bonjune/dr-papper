/**
 * Author: Bongjun Jang
 */

import React from "react";

import { IReview, Format } from "../../../components/Firebase/interface"
import { TestImage } from "../../../assets/img";
import SmallTag from "../../../components/Tag";
import { Row, Col } from 'reactstrap';

import PapperView from "../../../components/PapperView";

interface ICardProps {
  title: string;
  authors: string[];
  publishDate: string;
  publishedAt: string;
  link: string;
  toRead: boolean;
  imgShow: boolean;
  summary: string;
  tags: string[];
  boxes: Array<{
    format: Format;
    figure: string;
    subtitle: string;
    content: string;
  }>
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
      <Col lg="4" className="box papper-card" onClick={this.papperview}>
        {this.state.modalShow 
          ? <PapperView title={this.props.title}
                        authors={this.props.authors}
                        publishDate={this.props.publishDate}
                        publishedAt={this.props.publishedAt}
                        link={this.props.link}
                        toRead={this.props.toRead}
                        tags={this.props.tags}
                        boxex={this.props.boxes}
                        comment={this.props.summary}

                        modalShow={this.state.modalShow}
                        toggle={this.papperview}
                         /> 
          : <div></div> }
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
      </Col>
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
      <Row>
        {reviews.map(review =>
          <Card
            imgShow={imgShow}
            title={review.title}
            authors={review.authors}
            publishDate={review.publishDate}
            publishedAt={review.publishedAt}
            link={review.link}
            toRead={review.toRead}
            summary={review.comment}
            tags={review.tags.map(tag => tag.name)}
            boxes={review.boxes}
          />
        )}
      </Row>
    )
  }
}

export default CardBox;