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
    render() {
        return (
            <div className="component-menu-bar box">
                <div className="row">
                  <PapperView />
                  <PapperEditor />
            		</div>
                <Link to='/'><div className="row">
                	<button type="button" id="tab_button" className="btn text-uppercase" active>
                		<span><img src={readimg} alt="addbutton"/></span> Read
              		</button>
            		</div></Link>
                <Link to='/toread'><div className="row">
                	<button type="button" id="tab_button" className="btn text-uppercase" active>
                		<span><img src={toreadimg} alt="addbutton"/></span> ToRead
              		</button>
          			</div></Link>
                <div className="row">
                    <button type="button" id="tab_button" className="btn text-uppercase" active>
                        <span><img src={pinimg} alt="addbutton"/></span> Pinned
                    </button>
                    </div>
                <div className="row">
                    <button type="button" id="tab_button" className="btn text-uppercase" active>
                        <span><img src={trashimg} alt="addbutton"/></span> Deleted
                    </button>
                    </div>
            </div>
        );
    }

}

export default MenuBar;