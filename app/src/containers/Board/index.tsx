/**
 * Author: Bongjun Jang
 * Refactored from ReadBoard, ToReadBoard and the children of those from Seungho Baek
 */
import React from "react";
import { IReview } from 'src/components/Firebase/interface';
import { Row, Col } from 'reactstrap';
import { IFirebaseProps } from "../../components/Firebase";
import CardBox, { CardPredicate } from './CardBox';
import { withAuthorization, withAuthentication } from "../../components/Auth/Session";
import { compose } from "recompose";

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
    return (
      <div className="papper-board">
        <Row>
          <Col lg="auto">
            <h3 className="text-uppercase">pinned paper</h3>
          </Col>
        </Row>
        <CardBox reviews={reviews} cardPredicate={CardPredicate.Pinned} imgShow={imgShow} />
        <hr/>
        <Row>
          <Col lg="auto">
            <h3 className="text-uppercase">archived</h3>
          </Col>
        </Row>
        <CardBox reviews={reviews} cardPredicate={CardPredicate.Archived} imgShow={imgShow} />
      </div>
    )
  }
}

const condition = (authUser: any) => authUser != null;


const Board = compose<any, any>(
  withAuthentication,
  withAuthorization(condition),
)(BoardBase);

export default Board;