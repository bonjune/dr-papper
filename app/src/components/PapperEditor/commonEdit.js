import React, { Component }from "react";
import {FormGroup, Label, Input, Col} from 'reactstrap'
import { WithContext as ReactTags } from 'react-tag-input';
import './tagbox.css'

const KeyCodes = {
  comma: 188,
  enter: 13,
};
  
const delimiters = [KeyCodes.comma, KeyCodes.enter];

export default class CommonEdit extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title : "Untitled",
            authors : "",
            publishDate : "",
            published : "",
            link : "",
            tags: [],
            suggestions: this.props.suggestions
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

    handleDelete = (i) => {
        const { tags } = this.state;
        this.setState({
         tags: tags.filter((tag, index) => index !== i),
        }, ()=>this.props.handleEdit(this.state));
    }

    handleAddition = (tag) => {
      this.setState(state => (
        { tags: [...state.tags, tag] }),
        () => this.props.handleEdit(this.state)
      );
    }


    render() {
        //console.log(this.state)
        return(
            <div>
            <div style={{background:"white", padding:"5px"}}>
                <Input type="text" name="title" placeholder="Add Title" style={{fontSize:"30px", marginBottom:"8px", background:"#E3F2FD"}}
                        onChange={this.onInputChange}></Input>
                <FormGroup row>
                    <Label sm={2} size="lg" style={{textAlign:"right"}}>Authors</Label>
                    <Col sm={10}>
                        <Input type="text" name="authors" bsSize="lg" onChange={this.onInputChange}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2} size="lg" style={{textAlign:"right"}}>Date</Label>
                    <Col sm={10}>
                        <Input type="text" name="publishDate" bsSize="lg" onChange={this.onInputChange}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2} size="lg" style={{textAlign:"right"}}>Published</Label>
                    <Col sm={10}>
                        <Input type="text" name="published" bsSize="lg" onChange={this.onInputChange}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2} size="lg" style={{textAlign:"right"}}>Link</Label>
                    <Col sm={10}>
                        <Input type="url" name="link" bsSize="lg" onChange={this.onInputChange}/>
                    </Col>
                </FormGroup>
            </div>

            <div style={{background:"white", marginTop:"10px", padding:"5px"}}>
                <FormGroup row>
                    <Label sm={2} size="lg" style={{textAlign:"right"}}>Tags</Label>
                    <ReactTags
                        classNames={{
                            tags: "col-sm-10",
                            tagInputField: 'form-control-lg form-control',
                        }} 
                        tags={this.state.tags}
                        suggestions={this.state.suggestions}
                        handleDelete={this.handleDelete}
                        handleAddition={this.handleAddition}
                        allowDeleteFromEmptyInput={false}
                        allowDragDrop={false}
                        delimiters={delimiters}
                        labelField="name"
                        inputFieldPosition="inline"
                        inline/>
                </FormGroup>
            </div>
            </div>
        )}
}
