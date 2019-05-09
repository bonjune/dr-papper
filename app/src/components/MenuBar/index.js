import React, { Component } from "react";
import { Link } from 'react-router-dom'
import PapperView from "../PapperView";
import PapperEditor from "../PapperEditor";
import addbutton from '../../assets/icons/MenuBar_addReview.png'

import readimg from '../../assets/icons/readIcon.png'
import toreadimg from '../../assets/icons/toreadIcon.png'
import pinimg from '../../assets/icons/pinIcon.png'
import trashimg from '../../assets/icons/MenuBar_trashBin.png'

class MenuBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active1: true,
            active2: false,
            active3: false,
            active4: false,
        }
    }

    changeColor1(){
        this.setState({active1: true, active2: false, active3: false, active4: false})
    }
    changeColor2(){
        this.setState({active1: false, active2: true, active3: false, active4: false})
    }
    changeColor3(){
        this.setState({active1: false, active2: false, active3: true, active4: false})
    }
    changeColor4(){
        this.setState({active1: false, active2: false, active3: false, active4: true})
    }


    render() {
        let btn_id1 = this.state.active1 ? "tab_button_activeState" : "tab_button";
        let btn_id2 = this.state.active2 ? "tab_button_activeState" : "tab_button";
        let btn_id3 = this.state.active3 ? "tab_button_activeState" : "tab_button";
        let btn_id4 = this.state.active4 ? "tab_button_activeState" : "tab_button";

        return (
            <div className="component-menu-bar box">
                    <PapperView />
                    <PapperEditor />
                <Link to='/'><div className="row">
                	<button type="button" id={btn_id1} className="btn text-uppercase" active="true" onClick={this.changeColor1.bind(this)}>
                		<span><img src={readimg} alt="addbutton"/></span> Read
              		</button>
            		</div></Link>
                <Link to='/toread'><div className="row">
                	<button type="button" id={btn_id2} className="btn text-uppercase" active="true" onClick={this.changeColor2.bind(this)}>
                		<span><img src={toreadimg} alt="addbutton"/></span> ToRead
              		</button>
          			</div></Link>
                <div className="row">
                    <button type="button" id={btn_id3} className="btn text-uppercase" active="true" onClick={this.changeColor3.bind(this)}>
                        <span><img src={pinimg} alt="addbutton"/></span> Pinned
                    </button>
                    </div>
                <div className="row">
                    <button type="button" id={btn_id4} className="btn text-uppercase" active="true" onClick={this.changeColor4.bind(this)}>
                        <span><img src={trashimg} alt="addbutton"/></span> Deleted
                    </button>
                    </div>
            </div>
        );
    }

}

export default MenuBar;