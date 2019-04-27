import React, { Component }from "react";
import {FormGroup, Label, Input, Col} from 'reactstrap'

export default class CommonEdit extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title : "",
            author : "",
            publishDate : "",
            published : "",
            link : "",
            tag: ""
        };
    }
    
    onInputChange = event => {
        this.state[event.target.name] = event.target.value
        this.props.handleEdit(this.state)
    };


    render() {
        return(
            <>
            <div style={{background:"white", padding:"5px"}}>
                <Input type="text" name="title" placeholder="Add Title" style={{border:"0", fontSize:"30px", marginBottom:"8px"}}
                        onChange={this.onInputChange}></Input>
                <FormGroup row>
                    <Label sm={2} size="lg" style={{textAlign:"center"}}>Author</Label>
                    <Col sm={10}>
                        <Input type="text" name="author" bsSize="lg" onChange={this.onInputChange}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2} size="lg" style={{textAlign:"center"}}>Date</Label>
                    <Col sm={10}>
                        <Input type="text" name="publishDate" bsSize="lg" onChange={this.onInputChange}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2} size="lg" style={{textAlign:"center"}}>Published</Label>
                    <Col sm={10}>
                        <Input type="text" name="published" bsSize="lg" onChange={this.onInputChange}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2} size="lg" style={{textAlign:"center"}}>Link</Label>
                    <Col sm={10}>
                        <Input type="url" name="link" bsSize="lg" onChange={this.onInputChange}/>
                    </Col>
                </FormGroup>
            </div>

            <div style={{background:"white", marginTop:"10px", padding:"5px"}}>
                <FormGroup row>
                    <Label sm={2} size="lg" style={{textAlign:"center"}}>Tags</Label>
                    <Col sm={10}>
                        <Input type="text" name="tag" bsSize="lg" onChange={this.onInputChange}/>
                    </Col>
                </FormGroup>
            </div>
            </>
        )}
}
