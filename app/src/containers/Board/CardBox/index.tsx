/**
 * Author: Bongjun Jang
 */

import React from "react";
import { Row } from 'reactstrap';

// Rendering Component
import Card from "../Card";
import { IReview } from "../../../components/Firebase/interface";

interface ICardBoxProps {
  reviews: IReview[];
  imgShow: boolean;
  cardPredicate: (review: IReview) => boolean;
}

const CardBox = (props: ICardBoxProps) => {
  const { cardPredicate, imgShow } = props;
  const reviews = props.reviews.filter(cardPredicate);
  return (
    <Row>
      {reviews.length !== 0
        ? reviews.map((review) =>
          <Card
            key={`card-${review.reviewID}`}
            review={review}
            imgShow={imgShow}
          />
        )
      : <div style={{marginLeft: "20px", height: "50px", marginTop: "10px"}}>Add new papper</div>}
    </Row>
  )
}

export default CardBox;