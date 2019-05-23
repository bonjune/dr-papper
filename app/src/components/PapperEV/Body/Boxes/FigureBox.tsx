import React from 'react';
import {Col, Input, Row} from 'reactstrap'
import { IBox } from 'src/components/Firebase/interface';

import { TestImage } from '../../../../assets/img';
import { IFirebaseProps, withFirebase } from "../../../../components/Firebase";

interface IFigureBox {
    box : IBox;
    edit : boolean;
    onChangeHandler : (box:object) => void;

}

interface IFigureBoxState {
    box : IBox;
    fbfigsrc : string | null;
}



class FigureBoxBase extends React.Component<IFigureBox & IFirebaseProps, IFigureBoxState> {
    constructor(props:IFigureBox & IFirebaseProps){
        super(props);
        this.state = {
            box : this.props.box,
            fbfigsrc : null,
        }
        this.renderFigure(this.props.box.figsrc);

    }
    

    pasteFigure = (file:any) => {

        const {box} = this.state;

        for(const item of file.clipboardData.items){
            if (item.type.indexOf("image") !== -1) {
                // image
                const blob = item.getAsFile();
                const URLObj = window.URL;
                const source = URLObj.createObjectURL(blob);
                box.figure = blob;
                this.setState({box, fbfigsrc:source}, ()=>this.props.onChangeHandler(box))
                break;  
            }   
        }
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

    renderFigure = (figsrc : string) => {

        if (figsrc) {
            return this.props.firebase.downloadFigure(figsrc)
                    .then(url => {this.setState({fbfigsrc:url})})
        }
        else{
            return null;
        }
    }

    componentWillUnmount() {
        const {box} = this.state
        box.figure = null;
    }
    
    render() {
        const {fbfigsrc} = this.state;
        return(
            <div>
            {this.props.edit ?
            <Row>
                <Col xs="4" style={{height:"200px", border:"1px solid rgb(206, 212, 218)", margin:"15px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <div onPaste={file => this.pasteFigure(file)}>
                        {fbfigsrc
                        ? 
                        <div
                            style={{height:"180px", width:"180px", backgroundImage:`url(${fbfigsrc})`, backgroundRepeat: "no-repeat", backgroundSize:"contain"}}
                            onPaste={file => this.pasteFigure(file)}
                        />
                        : <div style={{ color: "rgb(108, 117, 125)" }}>
                            Paste(Ctrl + V) Figure!
                            </div>}
                    </div>

                </Col>
                <Col xs="7" style={{margin:"15px"}}>
                    <Row style={{height:"50px"}}>
                        <Input placeholder="Add Subtitle" name="subtitle" value={this.state.box.subtitle} onChange={this.onInputChange}/>
                    </Row>
                    <Row style={{height:"140px", marginTop:"10px"}}>
                        <Input placeholder="Add Content" type="textarea" name="content" value={this.state.box.content} onChange={this.onInputChange}/>
                    </Row>
                </Col>
            </Row> :
            <Row>
                <Col xs="4" style={{height:"200px", margin:"15px"}}>
                    <img src={fbfigsrc ? fbfigsrc : TestImage} style={{height:"100%", width:"100%"}}/>
                    </Col>
                <Col xs="7" style={{margin:"15px"}}>
                    <Row style={{height:"50px"}}>
                    <div className="form-control-lg" style={{background:"#E8EAF6", color: "black", fontWeight:"bold", border: "0px", fontSize:"1.25rem", marginBottom:"8px"}}>{this.state.box.subtitle}</div>
                    </Row>
                    <Row style={{height:"140px", marginTop:"10px"}}>
                    <div className="form-control-lg" style={{border: "0px", fontSize:"1.25rem", marginBottom:"8px", overflowY:"auto", wordBreak:"break-word", height:"100%"}}>{this.state.box.content}</div>
                    </Row>
                </Col>
            </Row>}
            </div>
        )
    }
};

const FigureBox = withFirebase(FigureBoxBase);

export default FigureBox;