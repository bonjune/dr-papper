/*  
/*  Title: PapperEV
/*  Author: Kihoon Kwon(kwon9804@kaist.ac.kr)
/* 
*/
import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { IReview } from 'src/components/Firebase/interface';
import Firebase, { IFirebaseProps, withFirebase } from "../../components/Firebase";

import PapperEVBody from "./Body";
import PapperEVHeader from "./Header";


interface IPapperEV {
  edit: boolean;
  handleModal: () => void;
  review: IReview;
}

interface IPapperEVState {
  edit: boolean;
  modalBgColor : string;
  review : IReview;
  uid : string;
  suggestions : Array<{
    id: string;
    name: string;
  }> | null;
}


class PapperEVBase extends React.Component<IPapperEV & IFirebaseProps, IPapperEVState> {
  constructor(props: IPapperEV & IFirebaseProps) {
    super(props);
    const user = (props.firebase as Firebase)!.auth.currentUser;
    
    this.state = {
      edit: props.edit,
      modalBgColor: '#EEEEEE',
      review: Object.assign({}, props.review),
      uid: user ? user.uid : "",
      suggestions : null
    };

    this.listTags();
  }


  listTags = async () => {
      const data:any[] = [];
      await this.props.firebase.tags().once('value')
        .then(snapshot => {
          snapshot.forEach((child) => {
            data.push({id:child.val().name, name:child.val().name});
          })
        })
      
      this.setState(() => ({
        suggestions: data
      }));
  }

  handleToggle = () => {
    this.props.handleModal()
  }

  handleFooterButtonClicked = () => {
    if(this.state.edit){

      const { reviewID } = this.state.review;
      const dispName = this.props.firebase.auth.currentUser!.displayName;
      let { boxes, tags } = this.state.review;

      this.state.review.userID = this.state.uid;
      this.state.review.username = dispName ? dispName : "";
      this.state.review.updateAt = Date.now().toString();

      // Upload a figure image in a box and delete empty box
      if (boxes) {
        const emptyBox:number[] = []
        boxes.forEach((box, idx) => {
          if (box.figure) {
            const figsrc = `${Math.random().toString(36)}_${idx}.png`;
            this.props.firebase.uploadFigure(box.figure, figsrc);
            box.figsrc = figsrc
          }
          if(box.subtitle === "" && box.content === "" && box.figsrc === ""){
            emptyBox.push(idx);
          }
        });
        this.state.review.boxes = boxes.filter((box, idx) => {
          return !emptyBox.includes(idx)
        });
      }

      // tags
      if(!tags){
        tags = [];
      }
      if (!this.props.review.tags) {
        this.props.review.tags = [];
      }

      const addedTags = tags.filter(tag => {
        let ret = true;
        this.props.review.tags.forEach(ptag => {
          if (ptag.name === tag.name) {
            ret = false;
          }
        });
        return ret;
      });
      
      const deletedTags = this.props.review.tags.filter(tag => {
        let ret = true;
        tags.forEach(ptag => {
          if (ptag.name === tag.name) {
            ret = false;
          }
        })
        return ret;
      });
     
      if (!this.state.review.createAt) {
        this.state.review.createAt = this.state.review.updateAt;
        this.props.firebase
          .makeNewPapperReview(this.state.review)
          .then(id => {
            addedTags.forEach(tag => this.props.firebase.makeNewTag(tag.name, id))
            deletedTags.forEach(tag => this.props.firebase.deleteTag(tag.name, id))
          });
      }
      else {
        this.props.firebase.updatePapperReview(reviewID, this.state.review);
        addedTags.forEach(tag => this.props.firebase.makeNewTag(tag.name, reviewID))
        deletedTags.forEach(tag => this.props.firebase.deleteTag(tag.name, reviewID))
      }
    }
    this.setState(prev => ({ edit: !prev.edit }));
  }

  onReviewChange = (e : object) => {
    const { review } = this.state;
    const keys = Object.keys(e);
    keys.forEach(key => {
      review[key] = e[key]
    });
    this.setState({ review });
  }

  render() {
    return (
      <Modal
        isOpen={true}
        toggle={this.handleToggle}
        size='lg'
        scrollable={true}
      >
      <ModalHeader
        style={{ background: this.state.modalBgColor, padding: 0 }}
        cssModule={{ 'modal-title': 'w-100 text-center mb-0' }}>
        {this.state.edit ? <PapperEVHeader toRead={this.state.review.toRead} onChangeHandler={this.onReviewChange}/> : null}
      </ModalHeader>
      <ModalBody style={{background:this.state.modalBgColor}}>
        {this.state.suggestions ? 
        <PapperEVBody
          edit={this.state.edit}
          review={this.state.review}
          onChangeHandler={this.onReviewChange}
          suggestions={this.state.suggestions}
        /> : null }
      </ModalBody>
        <ModalFooter style={{background:this.state.modalBgColor}}>
          {!this.props.review.userID || this.props.review.userID === this.state.uid
            ? <div style={{width:"100%"}}>
              {this.state.edit
                ? <Button
                    block={true}
                    style={{ background: "#B0BEC5", border: 0 }}
                    onClick={this.handleFooterButtonClicked}
                  >
                    Save
                  </Button>
                : <Button
                    block={true}
                    style={{ background: "#B0BEC5", border: 0 }}
                    onClick={this.handleFooterButtonClicked}
                  >
                Edit
              </Button>}
            </div> :
            <Button 
              block={true}
              onClick={this.handleToggle}
              style={{ background: "#B0BEC5", border: 0 }}
              >Done
            </Button>
          }
        </ModalFooter>
      </Modal>
    )
  }
}

const PapperEV = withFirebase(PapperEVBase);

export default PapperEV;
