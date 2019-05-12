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

export const CardPredicate = {
  Pinned: (review: IReview) => review !== null && review.pinned,
  Archived: (review: IReview) => review !== null && !review.pinned,
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