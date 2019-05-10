import React, { Component } from "react";
import { Link } from 'react-router-dom'
import PapperView from "../PapperView";
import PapperEditor from "../PapperEditor";

import * as ROUTES from "../../constants/routes";
// import addbutton from '../../assets/icons/MenuBar_addReview.png'

import { ReadIcon, ToReadIcon, PinIcon, TrashIcon } from '../../assets/icons';

interface IMenuBarButtonActivations {
  readButton: boolean;
  toReadButton: boolean;
  pinnedButton: boolean;
  trashButton: boolean;
}

const IMenuBarButtonActivationsInit: IMenuBarButtonActivations = {
  readButton: false,
  toReadButton: false,
  pinnedButton: false,
  trashButton: false
}

class MenuBar extends Component<{}, IMenuBarButtonActivations> {
  constructor(props: any) {
    super(props);
    this.state = {
      ...IMenuBarButtonActivationsInit,
      readButton: true
    }
  }

  changeColor = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.currentTarget;
    this.setState(current => ({
      ...IMenuBarButtonActivationsInit,
      [target.name]: true
    }));

  }

    render() {
      const {
        readButton,
        toReadButton,
        pinnedButton,
        trashButton
      } = this.state;

      const setButtonID = (activation: boolean) => (
        activation ? "tab_button_activeState" : "tab_button"
      )

      return (
        <div className="component-menu-bar box">
          <PapperView />
          <PapperEditor />
          <Link to={ROUTES.HOME}>
            <div className="row">
              <button name="readButton" type="button" id={setButtonID(readButton)} className="btn text-uppercase" onClick={this.changeColor}>
                <span>
                  <img src={ReadIcon} alt="addbutton" />
                </span>
                 Read
              </button>
            </div>
          </Link>
          <Link to={ROUTES.TO_READ}>
            <div className="row">
              <button name="toReadButton" type="button" id={setButtonID(toReadButton)} className="btn text-uppercase" onClick={this.changeColor}>
                <span>
                  <img src={ToReadIcon} alt="addbutton" />
                </span>
                 ToRead
              </button>
            </div>
          </Link>
            <div className="row">
              <button name="pinnedButton" type="button" id={setButtonID(pinnedButton)} className="btn text-uppercase" onClick={this.changeColor}>
                <span>
                  <img src={PinIcon} alt="addbutton" />
                </span>
                 Pinned
              </button>
            </div>
            <div className="row">
              <button name="trashButton" type="button" id={setButtonID(trashButton)} className="btn text-uppercase" onClick={this.changeColor}>
                <span>
                  <img src={TrashIcon} alt="addbutton" />
                </span>
                 Deleted
              </button>
            </div>
        </div>
      );
  }

}

export default MenuBar;