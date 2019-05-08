import React, { Component }from "react";
import {FormGroup, Label, Input, Col} from 'reactstrap'

export default class CommonInfo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title : "Face to InterFace: Facial Affect",
            authors : "Dian J.Schiano",
            publishDate : "2019.05.03",
            published : "CHI 00",
            link : "https://dl.acm.org/citation.cfm?id=766017",
            tags: "persona"
        };
    }


    render() {
        return(
            <div>
            <div style={{background:"white", padding:"5px"}}>
                <div class="form-control" style={{border: "0px", fontSize:"30px", color: "black", marginBottom:"8px"}}>{this.state.title}</div>
                <FormGroup row>
                    <Label sm={2} size="lg" style={{textAlign:"center"}}>Authors</Label>
                    <Col sm={10}>
                        <div class="form-control-lg" style={{border: "0px", fontSize:"1.25rem", marginBottom:"8px"}}>{this.state.authors}</div>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2} size="lg" style={{textAlign:"center"}}>Date</Label>
                    <Col sm={10}>
                        <div class="form-control-lg" style={{border: "0px", fontSize:"1.25rem", marginBottom:"8px"}}>{this.state.publishDate}</div>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2} size="lg" style={{textAlign:"center"}}>Published</Label>
                    <Col sm={10}>
                        <div class="form-control-lg" style={{border: "0px", fontSize:"1.25rem", marginBottom:"8px"}}>{this.state.published}</div>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2} size="lg" style={{textAlign:"center"}}>Link</Label>
                    <Col sm={10}>
                        <div class="form-control-lg" style={{border: "0px", fontSize:"1.25rem", marginBottom:"8px"}}>
                            <a href={this.state.link}>{this.state.link}</a>
                        </div>
                    </Col>
                </FormGroup>
            </div>

            <div style={{background:"white", marginTop:"10px", padding:"5px"}}>
                <FormGroup row>
                    <Label sm={2} size="lg" style={{textAlign:"center"}}>Tags</Label>
                    <Col sm={10}>
                        <div class="form-control-lg" style={{border: "0px", fontSize:"1.25rem", marginBottom:"8px"}}>{this.state.tags}</div>
                    </Col>
                </FormGroup>
            </div>
            </div>
        )}
}