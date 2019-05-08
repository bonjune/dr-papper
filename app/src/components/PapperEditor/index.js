import React, { Component } from 'react';
import DatePicker from "react-date-picker";
import { reviewEntry } from '../Firebase/reviewEntry';
import {Button, ButtonGroup, Modal, ModalHeader, ModalBody, ModalFooter, Form} from 'reactstrap'

import CommonEdit from './commonEdit'
import ToreadEdit from './toreadEdit'
import ReadEdit from './readEdit'

import { compose, withState } from "recompose";
import { withFirebase } from "../Firebase";

export class PapperEditorBase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...reviewEntry,
            modalShow : false,
            editMode : true,
        };
        this.handleModal = this.handleModal.bind(this);
    }
    
    makeSubmitEntry = () => ({
        "reviewId ": "",
        "userId ": "defaultUser",
    
        // Time Stamp
        "createAt": new Date().now(),
        "updateAt": new Date().now(),
    
        // Basic Information
        "title ": this.state.title,
        "authors": this.state.author,
        "publishDate ": this.state.publishDate,
        "published ": this.state.published,
        "link": this.state.link,
    
        // State
        "toRead": !this.state.editMode,
        "pinned": false,
        "trash": false,
    
        // Tags
        "tags": [
            {
                "key": "",
                "name": "",
            }
        ],
    })

    parseTags = tags => {
        const tagList = tags.split(',');
        console.log(tagList);
        return tagList;
    }

    onSubmit = event => {
        this.state.tags = this.parseTags(this.state.tags);
        this.props.firebase.makeNewPapperReview({
            ...this.state
        });
    };

    onCalendarChange = time => {
        this.setState({
            "publishDate": time 
        })
    }

    onInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.type === 'checkbox'
            ? target.checked
            : target.value
        this.setState({
            [name]: value
        });
    };

    handleModal = () => {
        this.setState(prevState => ({
            modalShow: !prevState.modalShow
        }));
    }

    handleMode = (mode) => {
        this.setState({
            editMode : mode
        })
    }

    handleEdit = e => {
        this.setState(e)
    }

    render() {
        return (
          <div>
                <Button onClick={this.handleModal}>
                    Add
                </Button>

                <Modal isOpen={this.state.modalShow} toggle={this.handleModal} size="lg" scrollable={true}>
                    <ModalHeader style={{background:"#EEEEEE", padding:"0"}} cssModule={{'modal-title': 'w-100 text-center mb-0'}} >
                        <div style={{flex:"1", display:"flex"}}>
                            <ButtonGroup style={{flex:"1"}}>
                                <Button style={{flex:"1", border:"0", background: this.state.editMode ? "white" : "#EEEEEE", color:"black", fontSize:"20px"}}
                                        onClick= {this.handleMode.bind(this, false)}>TOREAD</Button>
                                <Button style={{flex:"1", border:"0", background:this.state.editMode ? "#EEEEEE" : "white", color:"black", fontSize:"20px"}}
                                        onClick={this.handleMode.bind(this, true)}>READ</Button>
                            </ButtonGroup>
                        </div>
                    </ModalHeader>
                    <ModalBody style={{background:"#EEEEEE"}}>
                        <Form>
                            <CommonEdit handleEdit={this.handleEdit}/>
                            {this.state.editMode ? <ReadEdit /> : <ToreadEdit handleEdit={this.handleEdit}/>}
                            

                        </Form>
                    </ModalBody>
                    <ModalFooter style={{background:"#EEEEEE"}}>
                        <Button block style={{background:"#B0BEC5", border:"0"}} onClick={this.onSubmit}>Done</Button>
                    </ModalFooter>
                </Modal>
              </div>
        )
    }
}

const PapperEditor = compose(
    withFirebase
)(PapperEditorBase);

export default PapperEditor;
