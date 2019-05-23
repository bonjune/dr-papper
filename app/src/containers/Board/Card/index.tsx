/**
 * Author: Bongjun Jang
 */

import React from "react";
import { Row, Col } from "reactstrap";
import SmallTag from "../../../components/Tag";
//import PapperView from "../../../components/PapperView";
import PapperEV from "../../../components/PapperEV";

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
      if(tags){
        tags.forEach(tag => this.props.firebase.deleteTag(tag.name, reviewID)) // delete tags from db
      }
      alert('Permantly deleted')
    }
    else { // The papper is not in trash bin
      this.props.firebase.review(reviewID).update({
        trash: true // Move the papper to the trash bin
      })
      alert('Move to DELETED tap');
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
    const auth = (review.userID === this.props.firebase.auth.currentUser!.uid);
    const datetime = parseInt(this.props.review.updateAt, 10);
    
    return (
      <Col lg="3" style={{marginBottom: "10px"}}>
        <div>
          <section className="card-tags" style={{marginBottom: "5px"}}>
            <Row>
              {!review.trash && auth
                ? <div className="col">
                    <button 
                      style={{border: "none", backgroundColor: "#FFFFFF" }} 
                      onClick={this.onPinButtonClicked}>
                      <span><img src={pinImg} style={{ height: "20px", width: "20px"}} /></span>
                    </button> 
                  </div>
                : null}
              { trash && auth
                ? <div className="col">
                    <button 
                      style={{border: "none", backgroundColor: "#FFFFFF"}} 
                      onClick={this.onRestoreButtonClicked}>
                      <span><img src={Card_RestoreIcon} style={{ height: "20px", width: "20px"}} /></span>
                    </button>
                  </div>
                : null }
              {auth
                ? <div className="col-auto">
                  <button
                    style={{ border: "none", backgroundColor: "#FFFFFF" }}
                    onClick={this.onDeleteButtonClicked}>
                    <span><img src={Card_TrashIcon} style={{ height: "16px", width: "16px" }} /></span>
                  </button>
                  </div> : null}
            </Row>
          </section>
        </div>
        <div className="box papper-card" onClick={this.showPapperView}>
          {this.state.modalShow 
            ? <PapperEV
                edit = {false}
                handleModal = {this.showPapperView}
                review = {this.props.review}
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
          <Row>
            <div className="col text-left" style={{ fontSize: "12px", fontWeight: "bold", marginLeft: "5px", color: "#1A237E" }}>
              {review.username ? review.username : "defaultUser"}
            </div>
            <div className="col text-right" style={{ fontSize: "12px", marginRight: "5px" }}>
              {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(datetime)}
            </div>
          </Row>
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