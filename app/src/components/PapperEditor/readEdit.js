import React, { Component }from "react";
import {Button, Col, Row, Input , ButtonGroup} from 'reactstrap'

export default class ReadEdit extends React.Component{
    
    state = {
        boxes : []
    }

    addBox = () => {
        var {boxes} = this.state
        boxes.push(<BoxFormat key={boxes.length}/>)
        this.setState({boxes : boxes})
    }

    render() {
        var {boxes} = this.state
        return(
            <>
            {boxes.map((box) => box)}
            <div style={{background:"white", marginTop:"10px", padding:"5px"}}>
                <Button block color="white" onClick={this.addBox}>+</Button>
            </div>
            </>
        )}
}

class BoxFormat extends React.Component {
    
    state = {
        format : 0
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
                f = <FigureFormat key={this.props}/>
                break
            case 1: 
                f = <ContentFormat key={this.props}/>
                break
            default: f = <> </>
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
    render() {
        return(
            
            <Row>
                <Col xs="4" style={{height:"200px", border:"1px solid", margin:"15px"}}></Col>
                <Col xs="7" style={{margin:"15px"}}>
                    <Row style={{height:"50px"}}>
                        <Input placeholder="Add Subtitle"></Input>
                    </Row>
                    <Row style={{height:"140px", marginTop:"10px"}}>
                        <Input placeholder="Add Content" type="textarea"></Input>
                    </Row>
                </Col>
            </Row>


        )
    }
}

class ContentFormat extends React.Component {
    render() {
        return(
            <Row>
                <Col style={{margin:"15px"}}>
                    <Row style={{height:"50px"}}>
                        <Input placeholder="Add Subtitle"></Input>
                    </Row>
                    <Row style={{height:"140px", marginTop:"10px"}}>
                        <Input placeholder="Add Content" type="textarea"></Input>
                    </Row>
                </Col>
            </Row>
        )
    }
}
