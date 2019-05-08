import React, { Component } from 'react';
import DatePicker from "react-date-picker";
import { reviewEntry } from '../Firebase/reviewEntry';
import {Button, ButtonGroup, Col, Row, Input, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label} from 'reactstrap'

import sample from '../../assets/img/boxmain.png'

import { compose, withState } from "recompose";
import { withFirebase } from "../Firebase";
import addbutton from '../../assets/icons/MenuBar_addReview.png'

export default class EditBox extends Component {
	constructor(props) {
    super(props);
  }

  render() {
  	return (
  		<div>
  			{
  				this.props.toRead
  					? <ToreadEdit />
  					: <ReadEdit />
  			}
  		</div>
		)
  }
}


class ToreadEdit extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			content: "hello",
		};
	}

	render() {
		console.log(this.props);
		return (
      <div style={{background:"white", marginTop:"10px", padding:"5px 5px 5px 1px"}}>
        <FormGroup row>
          <Label sm={2} size="lg" style={{textAlign:"center"}}>Comment</Label>
          <Col sm={10}>
            <div class="form-control-lg" style={{border: "0px", fontSize:"1.25rem", marginBottom:"8px"}}>{this.state.content}</div>
          </Col>
        </FormGroup>
	    </div>
		)
	}
}

class ReadEdit extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			format : 0,
			subtitle : "Contribution",
			content : "You can click on a link and jump to another document. When you move the mouse over a link, the mouse arrow will turn into a little ..."
		};
	}

	render() {
		var {format} = this.state
		var f
		switch(format) {
			case 0:
				f = <FigureFormat subtitle={this.state.subtitle} content={this.state.content}/>
				break
			case 1:
				f = <ContentFormat subtitle={this.state.subtitle} content={this.state.content}/>
				break
			default: f = <div></div>
		}
		
		return (
			<div style={{background:"white", marginTop:"10px", padding:"5px"}}>
				{f}
			</div>
		)
	}
}

class ContentFormat extends React.Component {
	constructor(props) {
		super(props);
	}

	render(){
		return (
			<Row>
        <Col style={{margin:"15px"}}>
          <Row style={{height:"50px"}}>
            <div class="form-control-lg" style={{color: "black", fontWeight:"bold", border: "0px", fontSize:"1.25rem", marginBottom:"8px"}}>{this.props.subtitle}</div>
          </Row>
          <Row style={{height:"140px", marginTop:"10px"}}>
            <div class="form-control-lg" style={{border: "0px", fontSize:"1rem", marginBottom:"8px"}}>{this.props.content}</div>
          </Row>
        </Col>
      </Row>
		)
	}
}

class FigureFormat extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div style={{background:"white", marginTop:"10px", padding:"5px"}}>
        <Row>
          <Col xs="4" style={{height:"200px", margin:"15px"}}>
          	<img src={sample} style={{height:"100%", width:"100%"}}/>
        	</Col>
          <Col xs="7" style={{margin:"15px"}}>
            <Row style={{height:"50px"}}>
              <div class="form-control-lg" style={{color: "black", fontWeight:"bold", border: "0px", fontSize:"1.25rem", marginBottom:"8px"}}>{this.props.subtitle}</div>
            </Row>
            <Row style={{height:"140px", marginTop:"10px"}}>
              <div class="form-control-lg" style={{border: "0px", fontSize:"1.25rem", marginBottom:"8px"}}>{this.props.content}</div>
            </Row>
          </Col>
        </Row>
    	</div>
		)
	}
}