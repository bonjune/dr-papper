import React, { Component } from "react";
import { Link } from 'react-router-dom'
import addbutton from '../../assets/icons/MenuBar_addReview.png'
import readimg from '../../assets/icons/readIcon.png'
import toreadimg from '../../assets/icons/toreadIcon.png'

class MenuBar extends Component {
    render() {
        return (
            <div className="component-menu-bar box">
                <div className="row">
                	<button type="button" className="btn btn-outline-secondary text-uppercase">
                		<span><img src={addbutton} alt="addbutton"/></span> Add
              		</button>
            		</div>
                <Link to='/'><div className="row">
                	<button type="button" id="tab_button" className="btn text-uppercase" active>
                		<span><img src={readimg} alt="addbutton"/></span> Read
              		</button>
            		</div></Link>
                <Link to='/toread'><div className="row">
                	<button type="button" id="tab_button" className="btn text-uppercase" active>
                		<span><img src={toreadimg} alt="addbutton"/></span>ToRead
              		</button>
          			</div></Link>
            </div>
        );
    }

}

export default MenuBar;