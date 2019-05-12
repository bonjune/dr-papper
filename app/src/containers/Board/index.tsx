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
  Read: (review: IReview) => !review.toRead && !review.trash,
  ToRead: (review: IReview) => review.toRead && !review.trash,
  Pinned: (review: IReview) => review.pinned,
  Deleted: (review: IReview) => review.trash
}

class BoardBase extends React.Component<
  IFirebaseProps & IBoardBaseProps,
  IBoardBaseState> {
  constructor(props: IFirebaseProps & IBoardBaseProps) {
    super(props);
    this.state = {
      reviews: []
    };
  }

  componentDidMount() {
    this.props.firebase.reviews().on('value', snapshot => {
      if (snapshot === null) return;
      const children: IReview[] = [];
      snapshot.forEach(child => {
        const reviewVal: IReview = child.val();
        children.push({
          ...reviewVal
        })
      })
      this.setState({
        reviews: children
      })
    });
  }

  render() {
    const { boardPredicate } = this.props;
    const reviews = this.state.reviews.filter(boardPredicate);
    const imgShow = boardPredicate === BoardPredicate.Read;
    return (
      <div className="papper-board">
        {boardPredicate === BoardPredicate.Read || boardPredicate === BoardPredicate.ToRead
          ?
          <div>
          <Row>
            <Col sm="auto">
              <h3 className="text-uppercase">pinned paper</h3>
            </Col>
          </Row>
          <CardBox reviews={reviews} cardPredicate={CardPredicate.Pinned} imgShow={imgShow} />
          <hr/>
          <Row>
            <Col sm="auto">
              <h3 className="text-uppercase">archived</h3>
            </Col>
          </Row>
          <CardBox reviews={reviews} cardPredicate={CardPredicate.Archived} imgShow={imgShow} />
          </div>
           : null }
        {boardPredicate === BoardPredicate.Pinned
          ? <div>
              <Row>
                <Col sm="auto">
                  <h3 className="text-uppercase">pinned paper</h3>
                </Col>
              </Row>
              <CardBox reviews={reviews} cardPredicate={() => true} imgShow={true} />
            </div>
           : null}
        {boardPredicate === BoardPredicate.Deleted
          ? <div>
              <Row>
                <Col sm="auto">
                  <h3 className="text-uppercase">deleted paper</h3>
                </Col>
              </Row>
              <CardBox reviews={reviews} cardPredicate={() => true} imgShow={true} />
            </div>
           : null}
      </div>
    )
  }
}

const condition = (authUser: any) => authUser != null;


/**
 * * Why no firebase context provider here?
 * - withAuthorization already contains Firebase context
 * - For readability, it'd better to add withFirebase
 * - But for preformance, I omitted withFirebase. It works anyway!
 */
const Board = compose<any, any>(
  withAuthentication,
  withAuthorization(condition),
)(BoardBase);

export default Board;