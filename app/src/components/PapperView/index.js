import React, { Component } from 'react';
import DatePicker from "react-date-picker";
import { reviewEntry } from '../Firebase/reviewEntry';
import {Button, ButtonGroup, Col, Row, Input, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label} from 'reactstrap'

import CommonInfo from './commonInfo'
import sample from '../../assets/img/boxmain.png'

import { compose, withState } from "recompose";
import { withFirebase } from "../Firebase";
import addbutton from '../../assets/icons/MenuBar_addReview.png'

export class PapperView extends Component {
    constructor(props) {
      super(props);
      this.state = {
      		title : "Face to InterFace: Facial Affect",
          modalShow  : true,
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
					<Button type='button' className="btn btn-outline-secondary text-uppercase" onClick={this.toggle}>
						PapperView
					</Button>

					<Modal isOpen={this.state.modalShow} toggle={this.toggle} size='lg' scrollable={true}>
						<ModalHeader toggle={this.toggle} style={{background:"#EEEEEE", padding:"0"}} cssModule={{'modal-title': 'w-100 text-center mb-0'}} >
	          </ModalHeader>
	          <ModalBody style={{background:"#EEEEEE"}}>
	          	<CommonInfo />
	          	<div style={{background:"white", marginTop:"10px", padding:"5px"}}>
                <Row>
	                <Col xs="4" style={{height:"200px", margin:"15px"}}>
	                	<img src={sample} style={{height:"100%", width:"100%"}}/>
                	</Col>
	                <Col xs="7" style={{margin:"15px"}}>
                    <Row style={{height:"50px"}}>
                      <div class="form-control-lg" style={{color: "black", fontWeight:"bold", border: "0px", fontSize:"1.25rem", marginBottom:"8px"}}>Contribution</div>
                    </Row>
                    <Row style={{height:"140px", marginTop:"10px"}}>
                      <div class="form-control-lg" style={{border: "0px", fontSize:"1.25rem", marginBottom:"8px"}}> You can click on a link and jump to another document. 
                      When you move the mouse over a link, the mouse arrow will turn into a little ...</div>
                    </Row>
	                </Col>
		            </Row>
	          	</div>
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
