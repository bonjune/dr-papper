import React from "react";
import { Button, ButtonGroup } from 'reactstrap';
import { ReadIcon, ToReadIcon } from "../../../assets/icons";

interface IPapperEVHeader {
    toRead:boolean;
    onChangeHandler:(toRead:object) => void;
}

interface IPapperEVHeaderState {
    toRead : boolean;
}

const select = { 
    bg : "#EEEEEE",
    text : "black" 
};
const unselect  = {
    bg : "white",
    text : "rgb(206, 212, 218)"
}

class PapperEVHeader extends React.Component<IPapperEVHeader, IPapperEVHeaderState>{

    constructor(props:IPapperEVHeader){
        super(props);
        this.state = {
            toRead : props.toRead
        }
    }

    onButtonClick = (toread:boolean) => {
        this.setState({toRead:toread}, 
                    () => this.props.onChangeHandler(this.state));
    }

    render () {
        const {toRead} = this.state
        return(
        <div className="papperev-header" style={{flex:"1", display:"flex"}}>

            <ButtonGroup style={{flex:"1"}}>
                <Button 
                    className="papperev-toread"
                    style={{ 
                        background: toRead ? select.bg : unselect.bg,
                        border: "0",
                        color: toRead ? select.text : unselect.text,
                        flex:"1",
                        fontSize:"20px"}}
                        onClick={this.onButtonClick.bind(this, true)}>
                    {toRead ?  <img src={ToReadIcon} alt="toreadicon" style={{height:"20px", width:"20px"}}/> : null} 
                    <b>TOREAD</b>
                </Button>
                <Button 
                    className="papperev-read"
                    style={{
                        background: toRead ? unselect.bg : select.bg,
                        border :"0",
                        color: toRead ? unselect.text : select.text,
                        flex:"1",
                        fontSize:"20px"}}
                        onClick={this.onButtonClick.bind(this, false)}>
                    {toRead ? null : <img src={ReadIcon} alt="readicon" style={{height:"20px", width:"20px"}}/>}
                    <b>READ</b>
                </Button>
            </ButtonGroup>

        </div>
        )
    }
};

export default PapperEVHeader;