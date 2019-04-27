import React, { Component }from "react";
import {Button, Col, Row, Input ,Media} from 'reactstrap'

export default class ReadEdit extends React.Component{
    
    render() {
        return(
            <>
            <div style={{background:"white", marginTop:"10px", padding:"5px"}}>
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

            </div>
            <div style={{background:"white", marginTop:"10px", padding:"5px"}}>
                <Button block color="white" onClick={() => console.log(1)}>+</Button>
            </div>
            </>
        )}
}
