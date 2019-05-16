/*  
/*  Title: PapperEV
/*  Author: Kihoon Kwon(kwon9804@kaist.ac.kr)
/* 
*/
import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { IReview } from 'src/components/Firebase/interface';

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
}


class PapperEV extends React.Component<IPapperEV, IPapperEVState> {
  constructor(props: IPapperEV) {
    super(props);
    this.state = {
      edit : props.edit,
      modalBgColor : '#EEEEEE',
      review : props.review
    }
  }

  handleToggle = () => {
    this.props.handleModal()
  }

  handleFooterButtonClicked = () => {
    this.setState(prev => ({edit: !prev.edit}))
  }

  onReviewChange = (e : object) => {
    const {review} = this.state
    const keys = Object.keys(e)
    keys.forEach(key => {
      review[key] = e[key]
    });
    this.setState({review}, ()=>console.log(this.state))
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
          {this.state.edit ? <PapperEVHeader toRead={this.props.review.toRead} onChangeHandler={this.onReviewChange}/> : null}
        </ModalHeader>

        <ModalBody style={{background:this.state.modalBgColor}}>
          <div>1</div>
        </ModalBody>

        <ModalFooter style={{background:this.state.modalBgColor}}>
          {this.state.edit ? 
            <Button
              block={true}
              style={{ background: "#B0BEC5", border: 0 }}
              onClick={this.handleFooterButtonClicked}>
              Save
            </Button> :
            <Button
              block={true}
              style={{ background: "#B0BEC5", border: 0 }}
              onClick={this.handleFooterButtonClicked}>
              Edit
            </Button>}
        </ModalFooter>
      </Modal>
    )
  }
}


export default PapperEV;
