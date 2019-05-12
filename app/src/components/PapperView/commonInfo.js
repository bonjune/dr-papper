import React, { Component }from "react";
import {FormGroup, Label, Input, Col} from 'reactstrap';
import SmallTag from "../Tag";

export default class CommonInfo extends React.Component{
    constructor(props) {
        super(props);
    }


    render() {
        return(
            <div>
            <div style={{background:"white", padding:"5px"}}>
                <div className="form-control" style={{background:"#E3F2FD", border: "0px", fontWeight:"bold", fontSize:"30px", color: "black", marginBottom:"8px"}}>{this.props.title}</div>
                <FormGroup row>
                    <Label sm={2} size="lg" style={{ textAlign: "right", fontWeight: "bold" }}>
                        Authors
                    </Label>
                    <Col sm={10}>
                        <div className="form-control-lg" style={{ border: "0px", fontSize: "1.25rem", marginBottom: "8px" }}>
                            {this.props.authors}
                        </div>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2} size="lg" style={{ textAlign: "right", fontWeight: "bold" }}>
                        Date
                    </Label>
                    <Col sm={10}>
                        <div className="form-control-lg" style={{ border: "0px", fontSize: "1.25rem", marginBottom: "8px" }}>
                            {this.props.publishDate}
                        </div>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2} size="lg" style={{ textAlign: "right", fontWeight: "bold" }}>
                        Published
                    </Label>
                    <Col sm={10}>
                        <div className="form-control-lg" style={{ border: "0px", fontSize: "1.25rem", marginBottom: "8px" }}>
                            {this.props.published}
                        </div>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2} size="lg" style={{ textAlign: "right", fontWeight: "bold" }}>
                        Link
                    </Label>
                    <Col sm={10}>
                        <div className="form-control-lg" style={{border: "0px", fontSize:"1.25rem", marginBottom:"8px"}}>
                            <a href={this.props.link}>{this.props.link}</a>
                        </div>
                    </Col>
                </FormGroup>
            </div>

            <div style={{background:"white", marginTop:"10px", padding:"5px"}}>
                <FormGroup row>
                    <Label sm={2} size="lg" style={{ textAlign: "right", fontWeight: "bold" }}>
                        Tags
                    </Label>
                    <Col sm={10}>
                        <div className="form-control-lg" style={{border: "0px", fontSize:"1.25rem", marginBottom:"8px"}}>
                            {this.props.tags ? this.props.tags.map((tag, i) => (
                                <SmallTag key={`common-info-tag-${tag}`} tagName={tag} />
                            )) : null}
                        </div>
                    </Col>
                </FormGroup>
            </div>
            </div>
        )}
}