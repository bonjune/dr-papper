import React, { Component } from 'react';
import DatePicker from "react-date-picker";
import { reviewEntry } from '../Firebase/reviewEntry';
import {Button, ButtonGroup, Col, Row, Input, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label} from 'reactstrap'

import {TestImage} from '../../assets/img'

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
  					? <ToreadEdit comment={this.props.comment}/>
  					: <ReadEdit boxes={this.props.boxes}/>
  			}
  		</div>
		)
  }
}


class ToreadEdit extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
      <div style={{background:"white", marginTop:"10px", padding:"5px 5px 5px 1px"}}>
        <FormGroup row>
          <Label sm={2} size="lg" style={{textAlign:"right"}}>Comment</Label>
          <Col sm={10}>
            <div className="form-control-lg" style={{ border: "0px", fontSize: "1.25rem", marginBottom: "8px" }}>
              {this.props.comment}
            </div>
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
			format : this.props.boxes.format,
			subtitle : this.props.boxes.subtitle,
			content : this.props.boxes.content,
			figsrc : this.props.boxes.figsrc
		};

	}



	render() {
		var {format} = this.state;
		var f
		switch(format) {
			case 0:
				f = <FigureFormat subtitle={this.state.subtitle} content={this.state.content} figsrc={this.state.figsrc}/>
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
            <div className="form-control-lg" style={{background:"#E8EAF6",color: "black", fontWeight:"bold", border: "0px", fontSize:"1.25rem", marginBottom:"8px"}}>{this.props.subtitle}</div>
          </Row>
          <Row style={{height:"140px", marginTop:"10px"}}>
            <div className="form-control-lg" style={{border: "0px", fontSize:"1rem", marginBottom:"8px"}}>{this.props.content}</div>
          </Row>
        </Col>
      </Row>
		)
	}
}

class FigureFormatBase extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			figsrc : null
		}
		if(this.props.figsrc) {
			this.props.firebase.downloadFigure(this.props.figsrc)
			.then(figsrc => this.setState({figsrc}))
		}
	}

	render() {
		return (
			<div style={{background:"white", marginTop:"10px", padding:"5px"}}>
        <Row>
          <Col xs="4" style={{height:"200px", margin:"15px"}}>
          	<img src={this.state.figsrc ? this.state.figsrc : TestImage} style={{height:"100%", width:"100%"}}/>
        	</Col>
          <Col xs="7" style={{margin:"15px"}}>
            <Row style={{height:"50px"}}>
              <div className="form-control-lg" style={{background:"#E8EAF6", color: "black", fontWeight:"bold", border: "0px", fontSize:"1.25rem", marginBottom:"8px"}}>{this.props.subtitle}</div>
            </Row>
            <Row style={{height:"140px", marginTop:"10px"}}>
              <div className="form-control-lg" style={{border: "0px", fontSize:"1.25rem", marginBottom:"8px"}}>{this.props.content}</div>
            </Row>
          </Col>
        </Row>
    	</div>
		)
	}
}

const FigureFormat = withFirebase(FigureFormatBase);