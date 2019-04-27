import React, { Component }from "react";
import {FormGroup, Label, Input, Col} from 'reactstrap'

export default class ToreadEdit extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            comment : ""
        };
    }
    
    onInputChange = event => {
        this.state[event.target.name] = event.target.value
        this.props.handleEdit(this.state)
    };


    render() {
        return(
            <div style={{background:"white", marginTop:"10px", padding:"5px 5px 5px 1px"}}>
                <FormGroup row>
                    <Label sm={2} size="lg" style={{textAlign:"center"}}>Comment</Label>
                    <Col sm={10}>
                        <Input type="text" name="comment" bsSize="lg" onChange={this.onInputChange}/>
                    </Col>
                </FormGroup>
            </div>
        )}
}
