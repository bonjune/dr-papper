/*
/* Author: 
/*
*/
import React from "react";
import { Modal } from 'reactstrap';
//import { IReview } from 'src/components/Firebase/interface';

interface IPapperEV {
  edit: boolean,
  toread: boolean,
  modalShow: boolean
}

interface IPapperEVState {
    modalShow : boolean
}


class PapperEV extends React.Component<
                            IPapperEV,
                            IPapperEVState> {
  constructor(props: IPapperEV) {
    super(props);
    this.state = {
        modalShow : props.modalShow
    }
  }

  componentWillReceiveProps() {
      this.setState({modalShow : this.props.modalShow})
  }

  render() {
    const {modalShow} = this.state
    return (
        <Modal isOpen={modalShow} size="lg" scrollable={true}/>
    )
  }
}


export default PapperEV;
