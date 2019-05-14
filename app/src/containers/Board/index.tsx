/**
 * Author: Bongjun Jang
 * Refactored from ReadBoard, ToReadBoard and the children of those from Seungho Baek
 */
import React from "react";
import { IReview } from 'src/components/Firebase/interface';
import { Row, Col } from 'reactstrap';
import { IFirebaseProps } from "../../components/Firebase";
import CardBox  from './CardBox';
import { withAuthorization, withAuthentication } from "../../components/Auth/Session";
import { compose } from "recompose";
import { ReviewPredicate, ReviewPredicateType, predicateCompose, predicateUnion } from "./predicates";

type BoardType = "Read" | "ToRead" | "Pinned" | "Deleted" | "Search";

interface IBoardBaseProps {
  search?: boolean;
  boardType: BoardType;
  boardPredicate: ReviewPredicateType;
}

interface IBoardBaseState {
  reviews: IReview[]
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
    const { boardType, boardPredicate } = this.props;
    const reviews = this.state.reviews.filter(boardPredicate);
    const imgShow = boardType === "Read";
    return (
      <div className="papper-board">
        {boardType === "Read"
          ? <div>
              <Row>
                <Col sm="auto">
                  <h3 className="text-uppercase" style={{ marginBottom: "25px" }}>
                    pinned paper
                  </h3>
                </Col>
              </Row>
              <CardBox reviews={reviews} cardPredicate={ReviewPredicate.Pinned} imgShow={imgShow} />
              <hr/>
              <Row>
                <Col sm="auto">
                  <h3 className="text-uppercase" style={{ marginBottom: "25px" }}>
                    archived
                  </h3>
                </Col>
              </Row>
              <CardBox reviews={reviews} cardPredicate={ReviewPredicate.Archived} imgShow={imgShow} />
            </div> : null}
        {boardType === "ToRead"
          ? <div>
              <Row>
                <Col sm="auto">
                  <h3 className="text-uppercase" style={{ marginBottom: "25px" }}>
                    pinned paper
                  </h3>
                </Col>
              </Row>
              <CardBox reviews={reviews} cardPredicate={ReviewPredicate.Pinned} imgShow={imgShow} />
              <hr/>
              <Row>
                <Col sm="auto">
                  <h3 className="text-uppercase" style={{ marginBottom: "25px" }}>
                    archived
                  </h3>
                </Col>
              </Row>
              <CardBox reviews={reviews} cardPredicate={ReviewPredicate.Archived} imgShow={imgShow} />
            </div>
           : null}
        {boardType === "Pinned"
          ? <div>
              <Row>
                <Col sm="auto">
                  <h3 className="text-uppercase" style={{ marginBottom: "25px" }}>
                    pinned paper
                  </h3>
                </Col>
              </Row>
              <CardBox reviews={reviews} cardPredicate={() => true} imgShow={true} />
            </div>
           : null}
        {boardType === "Deleted"
          ? <div>
              <Row>
                <Col sm="auto">
                  <h3 className="text-uppercase" style={{ marginBottom: "25px" }}>
                    deleted paper
                  </h3>
                </Col>
              </Row>
              <CardBox reviews={reviews} cardPredicate={() => true} imgShow={true} />
            </div>
           : null}
        {boardType === "Search"
          ? <div>
              <Row>
                <Col sm="auto">
                  <h3 className="text-uppercase" style={{ marginBottom: "25px" }}>
                    Search Result
                  </h3>
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

export { ReviewPredicate, ReviewPredicateType, predicateCompose, predicateUnion };