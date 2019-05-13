import React, { Component }from "react";
import {Button, Col, Row, Input , ButtonGroup, Label} from 'reactstrap'
import PasteFigure from './pasteFigure'

import {AddBoxIcon, FigureFormatIcon, ContentFormatIcon} from "../../assets/icons"

const boxdb = {
    format : 0,
    subtitle : "",
    content: "",
    figure: ""
}

export default class ReadEdit extends React.Component{
    
    state = {
        containers : {},
        boxes: {},
        key: 0
    }

    addBox = () => {
        var {containers, boxes, key} = this.state
        var box = <BoxFormat key={this.state.key} handleEdit={this.handleEdit.bind(this, key)} onDelete={this.handleDelete.bind(this, key)}/>
        containers[key] = box

        boxes[key] = {
            ...boxdb
        }
        this.setState({containers : containers, boxes:boxes, key:key+1}, () =>this.props.handleEdit({boxes:this.state.boxes}))
    }

    handleEdit = (key, box) => {
        var {boxes} = this.state
        boxes[key] = {
            ...box
        }
        //console.log(boxes)
        this.props.handleEdit({boxes:boxes})
        //this.setState(boxes)
    }

    handleDelete = (key) => {
        var {containers, boxes} = this.state
        delete containers[key];
        delete boxes[key];
        this.setState({containers : containers, boxes:boxes}, () => this.props.handleEdit({boxes:this.state.boxes}))
    }

    render() {
        var {containers} = this.state
        //console.log(this.state)
        return(
            <div>
            {Object.keys(containers).map(key => containers[key])}
            <div style={{background:"white", marginTop:"10px", padding:"5px"}}>
                <Button block color="white" onClick={this.addBox}>
                    <img src={AddBoxIcon} alt="addbox" style={{height:"20px", width:"20px"}}/>
                </Button>
            </div>
            </div>
        )}
}

class BoxFormat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            format : 0,
            subtitle : "",
            content: "",
            figure: ""
        };
    }

    handleEdit = e => {
        this.setState(e, ()=> this.props.handleEdit(this.state))
    }

    changeFormat = (id) => {
        this.setState({
            format:id,
            subtitle : "",
            content: "",
            figure: ""
        }, ()=> this.props.handleEdit(this.state))
    }

    formatting = () => {
        
    }

    deleteBox = () => {
        this.props.onDelete();
    }

    render() {

        var {format} = this.state
        var f
        switch(format){
            case 0: 
                f = <FigureFormat key={this.props} handleEdit={this.handleEdit}/>
                break
            case 1: 
                f = <ContentFormat key={this.props} handleEdit={this.handleEdit}/>
                break
            default: f = <div> </div>
        }

        return(
            <div style={{background:"white", marginTop:"10px", padding:"5px"}}>
                {f}
                <div>
                    <ButtonGroup className="d-inline">
                        <Label style={{width:"80px", textAlign:"center"}}>Format</Label>
                        <Button id="0" onClick={this.changeFormat.bind(this, 0)} style={{background:"#FFECB3", color:"black", border:"0"}}>
                            <img src={FigureFormatIcon} alt="figformat" style={{height:"20px", width:"20px"}}/> Figure
                        </Button>
                        <Button id="1" onClick={this.changeFormat.bind(this, 1)} style={{background:"#FFF8E1", color:"black", border:"0"}}>
                            <img src={ContentFormatIcon} alt="contformat" style={{height:"20px", width:"20px"}}/> Content
                        </Button>
                    </ButtonGroup>
                    <Button className="float-right d-inline" onClick={this.deleteBox}  style={{background:"rgba(255,0,0, 0.5)", color:"black", border:"0px"}}>Delete</Button>
                </div>
            </div>
        )
    }
}

class FigureFormat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subtitle : "",
            content: "",
            figure: ""
        };
    }

    onInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        }, () => this.props.handleEdit(this.state))
    };

    onFigureChange = fig => {
        this.setState({
            figure : fig
        }, () => this.props.handleEdit(this.state))
    }

    render() {
        return(
            
            <Row>
                <Col xs="4" style={{height:"200px", border:"1px solid rgb(206, 212, 218)", margin:"15px", display: "flex", alignItems: "center", justifyContent: "center"}}><PasteFigure handleFigure={this.onFigureChange}/></Col>
                <Col xs="7" style={{margin:"15px"}}>
                    <Row style={{height:"50px"}}>
                        <Input placeholder="Add Subtitle" name="subtitle" onChange={this.onInputChange}></Input>
                    </Row>
                    <Row style={{height:"140px", marginTop:"10px"}}>
                        <Input placeholder="Add Content" type="textarea" name="content" onChange={this.onInputChange}></Input>
                    </Row>
                </Col>
            </Row>


        )
    }
}

class ContentFormat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subtitle : "",
            content: ""
        };
    }

    onInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        }, () => this.props.handleEdit(this.state))
    };


    render() {
        return(
            <Row>
                <Col style={{margin:"15px"}}>
                    <Row style={{height:"50px"}}>
                        <Input placeholder="Add Subtitle" name="subtitle" onChange={this.onInputChange}></Input>
                    </Row>
                    <Row style={{height:"140px", marginTop:"10px"}}>
                        <Input placeholder="Add Content" type="textarea" name="content" onChange={this.onInputChange}></Input>
                    </Row>
                </Col>
            </Row>
        )
    }
}
