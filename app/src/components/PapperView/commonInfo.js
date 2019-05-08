import React, { Component }from "react";
import {FormGroup, Label, Input, Col} from 'reactstrap'

export default class CommonInfo extends React.Component{
    constructor(props) {
        super(props);
    }


    render() {
        return(
            <div>
            <div style={{background:"white", padding:"5px"}}>
                <div class="form-control" style={{border: "0px", fontSize:"30px", color: "black", marginBottom:"8px"}}>{this.props.title}</div>
                <FormGroup row>
                    <Label sm={2} size="lg" style={{textAlign:"center"}}>Authors</Label>
                    <Col sm={10}>
                        <div class="form-control-lg" style={{border: "0px", fontSize:"1.25rem", marginBottom:"8px"}}>{this.props.authors}</div>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2} size="lg" style={{textAlign:"center"}}>Date</Label>
                    <Col sm={10}>
                        <div class="form-control-lg" style={{border: "0px", fontSize:"1.25rem", marginBottom:"8px"}}>{this.props.publishDate}</div>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2} size="lg" style={{textAlign:"center"}}>Published</Label>
                    <Col sm={10}>
                        <div class="form-control-lg" style={{border: "0px", fontSize:"1.25rem", marginBottom:"8px"}}>{this.props.published}</div>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2} size="lg" style={{textAlign:"center"}}>Link</Label>
                    <Col sm={10}>
                        <div class="form-control-lg" style={{border: "0px", fontSize:"1.25rem", marginBottom:"8px"}}>
                            <a href={this.props.link}>{this.props.link}</a>
                        </div>
                    </Col>
                </FormGroup>
            </div>

            <div style={{background:"white", marginTop:"10px", padding:"5px"}}>
                <FormGroup row>
                    <Label sm={2} size="lg" style={{textAlign:"center"}}>Tags</Label>
                    <Col sm={10}>
                        <div class="form-control-lg" style={{border: "0px", fontSize:"1.25rem", marginBottom:"8px"}}>{this.props.tags}</div>
                    </Col>
                </FormGroup>
            </div>
            </div>
        )}
}