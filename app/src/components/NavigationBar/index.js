import React, { Component } from "react";
import {
    InputGroup,
    Input,
    Button } from 'reactstrap';

import * as ROUTES from "../../constants/routes";
import './index.css';

class NavigationBar extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          isOpen: false
        };
      }

      toggle = () => {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

      render() {
        return (
          <div className="navBar">
            <div className="logoBox">
              <div className="logoText">Dr.Papper</div>
            </div>
            <div className="componentBox">
              <div className="searchBox">
                <InputGroup style={{marginTop: "13px"}}>
                  <Input placeholder="search" />
                  <Button color="secondary">search</Button>
                </InputGroup>
              </div>
              <div className="infoBox">
                <div className="userBox"><div className="userText">USER</div></div>
                <div className="settingBox"><div className="settingText">SETTING</div></div>
              </div>
            </div>
          </div>
        );
      }

}

export default NavigationBar;