import React, { Component }from "react";
import {FormGroup, Label, Input, Col} from 'reactstrap'

export default class CommonEdit extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title : "",
            authors : "",
            publishDate : "",
            published : "",
            link : "",
            tags: ""
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
            <>
            <div style={{background:"white", padding:"5px"}}>
                <Input type="text" name="title" placeholder="Add Title" style={{border:"0", fontSize:"30px", marginBottom:"8px"}}
                        onChange={this.onInputChange}></Input>
                <FormGroup row>
                    <Label sm={2} size="lg" style={{textAlign:"center"}}>Authors</Label>
                    <Col sm={10}>
                        <Input type="text" name="authors" bsSize="lg" onChange={this.onInputChange}/>
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
                        <Input type="text" name="tags" bsSize="lg" onChange={this.onInputChange}/>
                    </Col>
                </FormGroup>
            </div>
            </>
        )}
}
