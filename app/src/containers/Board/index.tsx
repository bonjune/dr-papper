/**
 * Author: Bongjun Jang
 * Refactored from ReadBoard, ToReadBoard and the children of those from Seungho Baek
 */
import React from "react";
import { withFirebase, IFirebaseProps } from "../../components/Firebase";
import { IReview } from 'src/components/Firebase/interface';
import CardBox, { CardPredicate } from './CardBox';

interface IBoardBaseProps {
  boardPredicate: (review: IReview) => boolean;
}

interface IBoardBaseState {
  reviews: IReview[]
}

export const BoardPredicate = {
  Read: (review: IReview) => !review.toRead,
  ToRead: (review: IReview) => review.toRead,
}

class BoardBase extends React.Component<
  IFirebaseProps & IBoardBaseProps,
  IBoardBaseState> {
  constructor(props: IFirebaseProps & IBoardBaseProps) {
    super(props);
    this.state = {
      reviews: []
    };
    this.props.firebase.reviews()
      .once('value').then(async snapshot => {
        const children: IReview[] = [];
        await snapshot.forEach(child => {
          const reviewVal: IReview = child.val();
          children.push({
            ...reviewVal
          });
        })
        this.setState({
          reviews: children
        });
      }
    );
  }

  render() {
    const { boardPredicate } = this.props;
    const reviews = this.state.reviews.filter(boardPredicate);
    const imgShow = boardPredicate === BoardPredicate.Read;
    console.log(reviews);
    return (
      <div className="papper-board">
        <CardBox reviews={reviews} cardPredicate={CardPredicate.Pinned} imgShow={imgShow} />
        <hr/>
        <CardBox reviews={reviews} cardPredicate={CardPredicate.Archived} imgShow={imgShow} />
      </div>
    )
  }
}

const Board = withFirebase(BoardBase);
export default Board;