/**
 * Author: Bongjun Jang
 */

import React from "react";
import { Row, Col } from "reactstrap";
import SmallTag from "../../../components/Tag";
import PapperView from "../../../components/PapperView";

import { TestImage } from "../../../assets/img";

import { withFirebase, IFirebaseProps } from "../../../components/Firebase";
import { IReview } from "../../../components/Firebase/interface";

interface ICardProps {
  imgShow: boolean;
  review: IReview;
}

interface ICardState {
  figsrc: string | null;
  modalShow: boolean;
}

class CardBase extends React.Component<ICardProps & IFirebaseProps, ICardState> {
  constructor(props: ICardProps & IFirebaseProps) {
    super(props);
    this.state = {
      figsrc: null,
      modalShow: false,
    }

    if (this.props.review.boxes) {
      const boxKeys = Object.keys(this.props.review.boxes)
      for (let i = 0; i < boxKeys.length; i++) {
        let fig = this.props.review.boxes[boxKeys[i]].figsrc
        if (fig) {
          this.props.firebase.downloadFigure(fig)
            .then(figsrc => this.setState({ figsrc }));
          break;
        }
      }
    }
  }
  onPinButtonClicked = () => {
    const { reviewID } = this.props.review;
    this.props.firebase.review(reviewID).update({
      pinned: !this.props.review.pinned
    })
  }

  onDeleteButtonClicked = () => {
    const { reviewID, trash } = this.props.review;
    // The Papper is already in trash bin
    if (trash) {
      // Delete the papper permanantly
      this.props.firebase.review(reviewID).remove();
    }
    // The papper is not in trash bin
    else {
      // Move the papper to the trash bin
      this.props.firebase.review(reviewID).update({
        trash: true
      })
    }
   }

  onRestoreButtonClicked = () => {
    const { reviewID } = this.props.review;
    this.props.firebase.review(reviewID).update({
      trash: false
    })
  }

  showPapperView = () => {
    this.setState(prevState => ({
      modalShow: !prevState.modalShow,
    }));
  }

  render() {
    const { trash } = this.props.review;
    return (
      <Col lg="4">
        <div>
          <section className="card-tags">
            <Row>
              <button
                type="button"
                style={{ float: "right", fontSize: "14px" }}
                className="signout-btn btn text-uppercase"
                onClick={this.onPinButtonClicked}
              >
                {this.props.review.pinned ? <span>Unpin </span>: <span>Pin</span>}
              </button>
              <button
                type="button"
                style={{ float: "right", fontSize: "14px" }}
                className="signout-btn btn text-uppercase"
                onClick={this.onDeleteButtonClicked}
              >
                Delete
              </button>
              { trash
                ? <button
                    type="button"
                    style={{ float: "right", fontSize: "14px" }}
                    className="signout-btn btn text-uppercase"
                    onClick={this.onRestoreButtonClicked}
                  >
                    Restore 
                  </button>
                : null
              }
            </Row>
          </section>
        </div>
        <div className="box papper-card" onClick={this.showPapperView}>
          {this.state.modalShow 
            ? <PapperView
                title={this.props.review.title}
                authors={this.props.review.authors}
                publishDate={this.props.review.publishDate}
                publishedAt={this.props.review.published}
                link={this.props.review.link}
                toRead={this.props.review.toRead}
                tags={ this.props.review.tags ? 
                  this.props.review.tags.map(tag => tag.name) : []}
                boxes={this.props.review.boxes}
                comment={this.props.review.comment}

                modalShow={this.state.modalShow}
                toggle={this.showPapperView}
              /> 
            : null}
          {this.props.imgShow
            ? (this.state.figsrc
              ? <img src={this.state.figsrc} alt="figure" />
              : <img src={TestImage} alt="testimage" />)
            : null}
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
            {this.props.review.tags
              ? (this.props.review.tags.map((tag, i) => (
                <SmallTag keyName={`card-${i}`} tagName={tag.name} />
                )))
              : null}
          </section>
        </div>
      </Col>
    )
  }
}

const Card = withFirebase(CardBase);

export default Card;