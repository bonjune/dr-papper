/**
 * Author: Bongjun Jang
 */

import React from "react";
import { Row, Col } from "reactstrap";
import SmallTag from "../../../components/Tag";
import PapperView from "../../../components/PapperView";

import { TestImage} from "../../../assets/img";

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
      const { figsrc } = this.props.review.boxes[0];
      this.props.firebase.downloadFigure(figsrc)
        .then(url =>
          this.setState(current => {
            if (this.state.figsrc !== null) {
              return ({ ...current })
            }
            return ({
              ...current,
              figsrc: url
            })
          }));
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
    if (trash) { // The Papper is already in trash bin
      this.props.firebase.review(reviewID).remove(); // Delete the papper permanantly
    }
    else { // The papper is not in trash bin
      this.props.firebase.review(reviewID).update({
        trash: true // Move the papper to the trash bin
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
    const { figsrc } = this.state;
    const { imgShow } = this.props;
    const { trash } = this.props.review;
    return (
      <Col lg="4">
        <div>
          <section className="card-tags" style={{marginLeft: "10px", marginBottom: "5px"}}>
            <Row >
              <button
                type="button"
                style={{fontSize: "12px", marginLeft: "10px", marginRight: "10px" }}
                className="signout-btn btn text-uppercase"
                onClick={this.onPinButtonClicked}
              >
                {this.props.review.pinned ? <span>Unpin</span>: <span>Pin</span>}
              </button>
              <button
                type="button"
                style={{fontSize: "12px" }}
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
          {imgShow
            ? (figsrc
              ? <img src={figsrc} style={{ height: "200px" }} alt="figure" />
              : <img src={TestImage} alt="testimage" />)
            : null}
          <p className="title font-weight-normal">
            <span className="ellipse" style={{ fontWeight: "bold", marginLeft: "5px" }}>
              {this.props.review.title}
            </span>
          </p>
          <p className="content font-weight-light multi-ellipse">
            {this.props.review.comment}
          </p>
        </div>
        <div>
          <section className="card-tags">
            {this.props.review.tags
              ? (this.props.review.tags.map((tag, i) => (
                <SmallTag
                  key={`card-smalltag-${i}`}
                  tagName={tag.name}
                />)))
              : null}
          </section>
        </div>
      </Col>
    )
  }
}

const Card = withFirebase(CardBase);

export default Card;