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
    }

		render() {
			return (
        	<div>
                <Modal isOpen={this.props.modalShow} toggle={this.props.toggle} size='lg' scrollable={true}>
        			<ModalHeader toggle={this.props.toggle} style={{background:"#EEEEEE", padding:"0"}} cssModule={{'modal-title': 'w-100 text-center mb-0'}} >
                    </ModalHeader>
                    <ModalBody style={{background:"#EEEEEE"}}>
                        <CommonInfo title={this.props.title} authors={this.props.authors} publishDate={this.props.publishDate} 
                        published={this.props.publishedAt} link={this.props.link} tags={this.props.tags}/>
                        <EditBox toRead={this.props.toRead} boxes={this.props.boxes} comment={this.props.comment}/>
                    </ModalBody>
                    <ModalFooter style={{background:"#EEEEEE"}}>
                        <Button block style={{background:"#B0BEC5", border:"0"}} onClick={this.props.toggle}> Done</Button>
                    </ModalFooter>
                </Modal>
            </div>
    	)
    }
}

export default PapperView;
