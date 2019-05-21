import React from 'react';
import {Button, ButtonGroup, Label} from 'reactstrap'
import {ContentFormatIcon, FigureFormatIcon} from "../../../../assets/icons"

import { Format, IBox } from 'src/components/Firebase/interface';

import FigureBox from "./FigureBox";
import ContentBox from './ContentBox'


export interface IEVBoxes {
    box : IBox;
    edit : boolean;
    key : number;
    keyNum: number;
    onChangeHandler : (box:object) => void;
    onDeleteHandler : (idx:number) => void;

}

interface IEVBoxState {
    box : IBox
}

export default class EVBoxes extends React.Component<IEVBoxes, IEVBoxState> {
    constructor(props:IEVBoxes){
        super(props);
        this.state = {
            box : this.props.box
        }
    }

    onDeleteBox = () => {
        this.props.onDeleteHandler(this.props.keyNum)
    }

    onChangeInput = (box:IBox) => {
        this.props.onChangeHandler(box)
    }

    onFormatChange = (f:Format) => {
        const {box} = this.state
        box.format = f
        this.setState({box})
        this.props.onChangeHandler(box)
    }

    componentWillReceiveProps(newprops:IEVBoxes){
        this.setState(prev => ({
            ...prev,
            box : newprops.box,
        }))
    }

    render() {
        return(
            <div style={{background:"white", marginTop:"10px", padding:"5px"}}>
                {this.state.box.format === Format.Figure ?
                    <FigureBox box={this.props.box} edit={this.props.edit} onChangeHandler={this.onChangeInput}/>:
                    <ContentBox box={this.props.box} edit={this.props.edit} onChangeHandler={this.onChangeInput}/>
                }
                {this.props.edit ?
                <div>
                    <ButtonGroup className="d-inline">
                        <Label style={{width:"80px", textAlign:"center"}}>Format</Label>
                        <Button id="0" style={{background:"#FFECB3", color:"black", border:"0"}} onClick={() => this.onFormatChange(Format.Figure)}>
                            <img src={FigureFormatIcon} alt="figformat" style={{height:"20px", width:"20px"}}/> Figure
                        </Button>
                        <Button id="1" style={{background:"#FFF8E1", color:"black", border:"0"}}  onClick={() => this.onFormatChange(Format.Content)}>
                            <img src={ContentFormatIcon} alt="contformat" style={{height:"20px", width:"20px"}}/> Content
                        </Button>
                    </ButtonGroup>
                    <Button className="float-right d-inline" style={{background:"rgba(255,0,0, 0.5)", color:"black", border:"0px"}} onClick={this.onDeleteBox}>
                        Delete
                    </Button>
                </div>:
                null
                }
            </div>
        )
    }
};
