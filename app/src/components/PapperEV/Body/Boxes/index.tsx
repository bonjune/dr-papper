import React from 'react';
import {Button, ButtonGroup, Label} from 'reactstrap'
import {ContentFormatIcon, FigureFormatIcon} from "../../../../assets/icons"

import { Format } from 'src/components/Firebase/interface';

import FigureBox from "./FigureBox";

export interface IEVBoxes {
    box : {
        format: Format;
        figure: string;
        subtitle: string;
        content: string;
        figsrc: string;
      };
    edit : boolean;
    key : number;
    onChangeHandler : (box:object) => void;

}

export default class EVBoxes extends React.Component<IEVBoxes> {
    constructor(props:IEVBoxes){
        super(props);

    }

    onBoxChange = () => {

    }

    render() {
        return(
            <div style={{background:"white", marginTop:"10px", padding:"5px"}}>
                {this.props.box.format === Format.Figure ?
                    <FigureBox box={this.props.box} edit={this.props.edit} onChangeHandler={this.onBoxChange}/> :
                    <div>12345</div>
                }
                {this.props.edit ?
                <div>
                    <ButtonGroup className="d-inline">
                        <Label style={{width:"80px", textAlign:"center"}}>Format</Label>
                        <Button id="0" style={{background:"#FFECB3", color:"black", border:"0"}}>
                            <img src={FigureFormatIcon} alt="figformat" style={{height:"20px", width:"20px"}}/> Figure
                        </Button>
                        <Button id="1" style={{background:"#FFF8E1", color:"black", border:"0"}}>
                            <img src={ContentFormatIcon} alt="contformat" style={{height:"20px", width:"20px"}}/> Content
                        </Button>
                    </ButtonGroup>
                    <Button className="float-right d-inline" style={{background:"rgba(255,0,0, 0.5)", color:"black", border:"0px"}}>Delete</Button>
                </div>:
                null
                }
            </div>
        )
    }
};
