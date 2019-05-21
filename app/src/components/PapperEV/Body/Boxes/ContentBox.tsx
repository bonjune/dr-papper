import React from 'react';
import {Col, Input, Row} from 'reactstrap'
import { IBox } from 'src/components/Firebase/interface';

interface IFigureBox {
    box : IBox;
    edit : boolean;
    onChangeHandler : (box:object) => void;

}

interface IFigureBoxState {
    box : IBox;

}


export default class ContentBox extends React.Component<IFigureBox, IFigureBoxState> {
    constructor(props:IFigureBox){
        super(props);
        this.state = {
            box : this.props.box,

        }


    }
    

    componentWillReceiveProps(newprops:IFigureBox){
        this.setState({
            box : newprops.box,
        })
    }

    onInputChange = (e:any) => {

        const {box} = this.state;
        const target = e.target;
        const name = target.name;
        const value = target.value;

        box[name] = value
        this.setState({box})
        this.props.onChangeHandler(box)
    }

    
    render() {
        return(
            <div>
            {this.props.edit ?
            <Row>
                <Col style={{margin:"15px"}}>
                    <Row style={{height:"50px"}}>
                        <Input placeholder="Add Subtitle" name="subtitle" value={this.state.box.subtitle} onChange={this.onInputChange}/>
                    </Row>
                    <Row style={{height:"140px", marginTop:"10px"}}>
                        <Input placeholder="Add Content" type="textarea" name="content" value={this.state.box.content} onChange={this.onInputChange}/>
                    </Row>
                </Col>
            </Row> :
            <Row>
            <Col style={{margin:"15px"}}>
              <Row style={{height:"50px"}}>
                <div className="form-control-lg" style={{background:"#E8EAF6",color: "black", fontWeight:"bold", border: "0px", fontSize:"1.25rem", marginBottom:"8px"}}>{this.state.box.subtitle}</div>
              </Row>
              <Row style={{height:"140px", marginTop:"10px"}}>
                <div className="form-control-lg" style={{border: "0px", fontSize:"1rem", marginBottom:"8px"}}>{this.state.box.content}</div>
              </Row>
            </Col>
          </Row>}
            </div>
        )
    }
};
