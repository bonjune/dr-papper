import React from "react";
import {Col, FormGroup, Input, Label} from 'reactstrap';

interface IEVContent {
    content : object;
    edit : boolean;
    label : string;
    onChangeHandler:(content:object) => void;
}

interface IEVContentState {
    content : object;
}

class EVContent extends React.Component<IEVContent, IEVContentState> {
    constructor(props: IEVContent){
        super(props);
        this.state = {
            content : props.content
        }
    }
    
    onInputChange = (e:any) => {

        const target = e.target;
        const name = target.name;
        const value = target.value;
        const content = {}
        content[name] = value
        this.setState({content})
        this.props.onChangeHandler(content)
    }
    
    render() {

        const {edit, label} = this.props
        const {content} = this.state
        const contentKey = Object.keys(content)[0]
        const contentValue = content[contentKey]

    
    return (
        <span>
            {!edit && label === "Title" ?
            <div className="form-control" style={{background:"#E3F2FD", border: "0px", fontWeight:"bold", fontSize:"30px", color: "black", marginBottom:"8px", height:"auto"}}>
                {contentValue}
            </div> :
            <FormGroup row={true}>
                <Label sm={2} size="lg" style={{ textAlign: "right", fontWeight: "bold" }}>
                    {label}
                </Label>
                <Col sm={10}>
                    {edit ? 
                        <Input type="text" name={contentKey} bsSize="lg" defaultValue={contentValue} onChange={this.onInputChange}/> :
                        <div className="form-control-lg" style={{ border: "0px", fontSize: "1.25rem", marginBottom: "8px" }}>
                            {contentKey==='link' ? <a href={contentValue}>{contentValue}</a> : contentValue}
                        </div>}
                </Col>
            </FormGroup>}
        </span>)
        
    }
};

export default EVContent;