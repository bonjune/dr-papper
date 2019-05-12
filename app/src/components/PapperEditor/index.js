import React, { Component } from 'react';
import DatePicker from "react-date-picker";
import { reviewEntry } from '../Firebase/reviewEntry';
import {Button, ButtonGroup, Modal, ModalHeader, ModalBody, ModalFooter, Form} from 'reactstrap'

import CommonEdit from './commonEdit'
import ToreadEdit from './toreadEdit'
import ReadEdit from './readEdit'


import { compose, withState } from "recompose";
import { withFirebase } from "../Firebase";
import addbutton from '../../assets/icons/MenuBar_addReview.png'

export class PapperEditorBase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...reviewEntry,
            modalShow : false,
            editMode : true,
        };
        this.handleModal = this.handleModal.bind(this);
        this.tags = this.props.firebase.tags();

    }

    listTags = async () => {
        let data = [];
        await this.tags.once('value')
          .then(snapshot => {
            snapshot.forEach((child) => {
              data.push({id:child.val().name, text:child.val().name});
            })
          })
        
        this.setState(() => ({
          suggestions: data
        }));
    }
    
    makeSubmitEntry = () => ({
        "reviewId": "",
        "userId": "defaultUser",
    
        // Time Stamp
        "createAt": Date.now(),
        "updateAt": Date.now(),
    
        // Basic Information
        "title": this.state.title,
        "authors": this.state.authors,
        "publishDate": this.state.publishDate,
        "published": this.state.published,
        "link": this.state.link,
    
        // State
        "toRead": !this.state.editMode,
        "pinned": false,
        "trash": false,
    
        // Tags
        "tags": this.state.tags,

        //toread comment
        "comment": this.state.comment,

        //boxes
        "boxes": this.state.boxes
    })


    onSubmit = event => {
        //this.state.tags = this.parseTags(this.state.tags);

        //uploading figure image in box
        if(this.state.boxes !== ""){
            var boxKeys = Object.keys(this.state.boxes)
            boxKeys.forEach(key => {
                if(this.state.boxes[key].figure !== ""){
                    var figsrc = `${Math.random().toString(36)}_${key}.png`;
                    this.props.firebase.uploadFigure(this.state.boxes[key].figure, figsrc);
                    this.state.boxes[key].figsrc = figsrc
                }
        })}

        //console.log(this.makeSubmitEntry();

        if(this.state.tags !== ""){
            this.state.tags.forEach(tag => {
                this.props.firebase.makeNewTag(tag.text)
        })}

        //set db
        this.props.firebase.makeNewPapperReview({
            ...this.makeSubmitEntry()
        });

        this.setState({
            ...reviewEntry,
            modalShow:false
        })
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
        this.listTags()
        .then(() => this.setState(prevState => ({
            modalShow: !prevState.modalShow
        })))
    }

    handleMode = (mode) => {
        this.setState({
            editMode : mode
        })
    }

    handleEdit = e => {
        //console.log(e)
        this.setState(e)
    }

    componentWillMount() {
        this.listTags()
    }

    render() {
        //console.log(this.state)
        return (
          <div>
                <div className="row">
                <button onClick={this.handleModal} type="button" className="btn text-uppercase">
                        <span><img src={addbutton} alt="addbutton"/></span>Add
                </button>
                </div>

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
                        {this.state.suggestions ?
                        <Form>
                            <CommonEdit handleEdit={this.handleEdit} suggestions={this.state.suggestions}/>
                            {this.state.editMode ? <ReadEdit handleEdit={this.handleEdit}/> : <ToreadEdit handleEdit={this.handleEdit}/>}
                        </Form>
                        : <div></div>}
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
