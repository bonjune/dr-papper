import React from 'react';
import {Col, Input, Row} from 'reactstrap'
import {IEVBoxes} from "./index";

interface IFigureBox {
    box : Pick<IEVBoxes, 'box'>['box']
    edit : boolean;
    onChangeHandler : (box:object) => void;

}

interface IFigureBoxState {
    box : Pick<IEVBoxes, 'box'>['box'];
    figsrc : any;
    figure : any;
}

export default class FigureBox extends React.Component<IFigureBox, IFigureBoxState> {
    constructor(props:IFigureBox){
        super(props);
        this.state = {
            box : this.props.box,
            figsrc : null,
            figure : null,
        }

    }

    pasteFigure = (file:any) => {

        for(const item of file.clipboardData.items){
            if (item.type.indexOf("image") !== -1) {
                // image
                const blob = item.getAsFile();
                const URLObj = window.URL;
                const source = URLObj.createObjectURL(blob);
                this.setState({
                    figsrc:source,
                    figure:blob,
                })
                break;
            }
            
        }
    }
    
    render() {
        const {figsrc} = this.state;
        return(
            <Row>
                <Col xs="4" style={{height:"200px", border:"1px solid rgb(206, 212, 218)", margin:"15px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <div onPaste={file => this.pasteFigure(file)}>
                        {figsrc
                        ? <img
                            src={figsrc}
                            key={figsrc}
                            style={{ maxWidth: "180px", maxHeight: "180px" }}
                            alt={`pasted`}
                            onPaste={file => this.pasteFigure(file)}
                            />
                        : <div style={{ color: "rgb(108, 117, 125)" }}>
                            Paste(Ctrl + V) Figure!
                            </div>}
                    </div>
                </Col>
                <Col xs="7" style={{margin:"15px"}}>
                    <Row style={{height:"50px"}}>
                        <Input placeholder="Add Subtitle" name="subtitle" />
                    </Row>
                    <Row style={{height:"140px", marginTop:"10px"}}>
                        <Input placeholder="Add Content" type="textarea" name="content" />
                    </Row>
                </Col>
            </Row>
        )
    }
};