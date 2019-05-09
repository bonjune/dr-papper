import React, { Component } from 'react';
import DatePicker from "react-date-picker";
import { reviewEntry } from '../Firebase/reviewEntry';
import {Button, ButtonGroup, Col, Row, Input, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label} from 'reactstrap'

import CommonInfo from './commonInfo'
import EditBox from './editBox'

import { compose, withState } from "recompose";
import { withFirebase } from "../Firebase";
import addbutton from '../../assets/icons/MenuBar_addReview.png'

export class PapperView extends Component {
    constructor(props) {
      super(props);
      this.state = {
        modalShow  : false,

        // Basic Information
        title : "Face to InterFace: Facial Affect",
        authors : "Dian J.Schiano",
        publishDate : "2019.05.03",
        published : "CHI 00",
        link : "https://dl.acm.org/citation.cfm?id=766017",

        // State
        toRead : false,
        pinned : false,
        trash : false,

        // Tags
        tags : "persona",

        //boxes
        // boxes :
      };

      this.toggle = this.toggle.bind(this);
    }

	  toggle() {
	    this.setState(prevState => ({
	      modalShow: !prevState.modalShow
	    }));
	  }

		render() {
			return (
				<div>
					<Button type="button" className="btn text-uppercase" onClick={this.toggle}> PapperView</Button>

					<Modal isOpen={this.state.modalShow} toggle={this.toggle} size='lg' scrollable={true}>
						<ModalHeader toggle={this.toggle} style={{background:"#EEEEEE", padding:"0"}} cssModule={{'modal-title': 'w-100 text-center mb-0'}} >
	          </ModalHeader>
	          <ModalBody style={{background:"#EEEEEE"}}>
	          	<CommonInfo title={this.state.title} authors={this.state.authors} publishDate={this.state.publishDate} 
	          	published={this.state.published} link={this.state.link} tags={this.state.tags}/>
	          	<EditBox toRead={this.state.toRead} />
	          </ModalBody>
	          <ModalFooter style={{background:"#EEEEEE"}}>
	          	<Button block style={{background:"#B0BEC5", border:"0"}} onClick={this.toggle}> Done</Button>
	          </ModalFooter>
        	</Modal>
      	</div>
    	)
    }
}

export default PapperView;
