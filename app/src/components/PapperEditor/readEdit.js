import React, { Component }from "react";
import {Button, Col, Row, Input , ButtonGroup} from 'reactstrap'
import PasteFigure from './pasteFigure'

export default class ReadEdit extends React.Component{
    
    state = {
        containers : [],
        boxes: {}
    }

    addBox = () => {
        var {containers} = this.state
        var box = <BoxFormat key={containers.length} handleEdit={this.handleEdit.bind(this, containers.length)}/>
        containers.push({container:box})
        this.setState({containers : containers})
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

    render() {
        var {containers} = this.state
        //console.log(this.state)
        return(
<<<<<<< HEAD
            <div>
            {boxes.map((box) => box)}
=======
            <>
            {containers.map((box) => box.container)}
>>>>>>> e61bce9226493a6ec0940ec3c32fba508a34d5af
            <div style={{background:"white", marginTop:"10px", padding:"5px"}}>
                <Button block color="white" onClick={this.addBox}>+</Button>
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
            content: ""
        };
    }

    handleEdit = e => {
        this.state = {
            ...e,
            format:this.state.format
        }
        this.props.handleEdit(this.state)
    }

    changeFormat = (id) => {
        this.setState({format:id})
    }

    formatting = () => {
        
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
                <ButtonGroup>
                    <Button id="0" onClick={this.changeFormat.bind(this, 0)}>Figure</Button>
                    <Button id="1" onClick={this.changeFormat.bind(this, 1)}>Content</Button>
                </ButtonGroup>
            </div>
        )
    }
}

class FigureFormat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subtitle : "",
            content: ""
        };
    }

    onInputChange = event => {
        this.state[event.target.name] = event.target.value
        this.props.handleEdit(this.state)
    };

    render() {
        return(
            
            <Row>
                <Col xs="4" style={{height:"200px", border:"1px solid", margin:"15px"}}>PASTE IMAGE!<PasteFigure /></Col>
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
        this.state[event.target.name] = event.target.value
        this.props.handleEdit(this.state)
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
