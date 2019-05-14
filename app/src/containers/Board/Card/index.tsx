/**
 * Author: Bongjun Jang
 */

import React from "react";
import { Row, Col } from "reactstrap";
import SmallTag from "../../../components/Tag";
import PapperView from "../../../components/PapperView";

import { TestImage } from "../../../assets/img";
import { PinIcon, UnPinIcon, Card_TrashIcon, Card_RestoreIcon } from "../../../assets/icons";

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
      if(figsrc){
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
  }

  onPinButtonClicked = () => {
    const { reviewID } = this.props.review;
    this.props.firebase.review(reviewID).update({
      pinned: !this.props.review.pinned
    })
  }

  onDeleteButtonClicked = () => {
    const { reviewID, trash, tags } = this.props.review;
    if (trash) { // The Papper is already in trash bin
      this.props.firebase.review(reviewID).remove(); // Delete the papper permanantly
      tags.forEach(tag => this.props.firebase.deleteTag(tag.name, reviewID))
    
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
    const { review, imgShow } = this.props;
    const { trash } = this.props.review;
    const pinImg = this.props.review.pinned ? PinIcon : UnPinIcon
    return (
      <Col lg="3" style={{marginBottom: "30px"}}>
        <div>
          <section className="card-tags" style={{marginBottom: "5px"}}>
            <Row>
              <Col sm="2">
                {!review.trash
                  ? <button 
                      style={{border: "none", backgroundColor: "#FFFFFF" }} 
                      onClick={this.onPinButtonClicked}>
                      <span><img src={pinImg} style={{ height: "20px", width: "20px"}} /></span>
                    </button> 
                  : null}
              </Col>
              { trash ? <Col sm="6"></Col> : <Col sm="8"></Col>}
              { trash
                  ? <Col sm="2">
                      <button 
                        style={{border: "none", backgroundColor: "#FFFFFF"}} 
                        onClick={this.onRestoreButtonClicked}>
                        <span><img src={Card_RestoreIcon} style={{ height: "20px", width: "20px"}} /></span>
                      </button>
                    </Col>
                  : null
              }
              <Col sm="2">
                <button 
                  style={{border: "none", backgroundColor: "#FFFFFF" }} 
                  onClick={this.onDeleteButtonClicked}>
                  <span><img src={Card_TrashIcon} style={{ height: "16px", width: "16px"}} /></span>
                </button>
              </Col>
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
              ? <img src={figsrc} style={{ height: "150px" }} alt="figure" />
              : <img src={TestImage} alt="testimage" />)
            : null}
          <p className="title font-weight-normal">
            <div className="ellipse" style={{ fontWeight: "bold", marginLeft: "5px" }}>
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