import React from "react";
import { Link, withRouter } from 'react-router-dom'
import PapperEditor from "../PapperEditor";

import * as ROUTES from "../../constants/routes";

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

const menu = (pathname: string)  => {
  switch (pathname) {
    case ROUTES.READ:
      return "readButton";
    case ROUTES.TO_READ:
      return "toReadButton";
    case ROUTES.PINNED:
      return "pinnedButton";
    case ROUTES.DELETED:
      return "trashButton";
    default:
      return "default";
  }
}

class MenuBar extends React.Component<any, IMenuBarButtonActivations> {
  constructor(props: any) {
    super(props);
    
    this.state = {
      ...IMenuBarButtonActivationsInit,
      [menu(this.props.location.pathname)]: true
    }
  }

  componentDidUpdate(prevProps: any) {
    if (this.props.history.location.pathname !== prevProps.location.pathname) {
      this.setState({
        ...IMenuBarButtonActivationsInit,
        [menu(this.props.location.pathname)]: true
      })
    }

  }

  changeColor = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.currentTarget;
    this.setState(() => ({
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
          <PapperEditor />
          <Link to={ROUTES.READ} style={{textDecoration:'none'}}>
            <div className="row">
              <button
                name="readButton"
                type="button"
                id={setButtonID(readButton)}
                className="btn text-uppercase"
                onClick={this.changeColor}
              >
                <span>
                  <img src={ReadIcon} alt="addbutton" />
                </span>
                 Read
              </button>
            </div>
          </Link>
          <Link to={ROUTES.TO_READ} style={{textDecoration:'none'}}>
            <div className="row">
              <button
                name="toReadButton"
                type="button"
                id={setButtonID(toReadButton)}
                className="btn text-uppercase"
                onClick={this.changeColor}
              >
                <span>
                  <img src={ToReadIcon} alt="addbutton" />
                </span>
                 To Read
              </button>
            </div>
          </Link>
          <Link to={ROUTES.PINNED} style={{textDecoration:'none'}}>
            <div className="row">
              <button
                name="pinnedButton"
                type="button"
                id={setButtonID(pinnedButton)}
                className="btn text-uppercase"
                onClick={this.changeColor}
              >
                <span>
                  <img src={PinIcon} alt="addbutton" />
                </span>
                 Pinned
              </button>
            </div>
          </Link>
          <Link to={ROUTES.DELETED} style={{textDecoration:'none'}}>
            <div className="row">
              <button
                name="trashButton"
                type="button"
                id={setButtonID(trashButton)}
                className="btn text-uppercase"
                onClick={this.changeColor}
              >
                <span>
                  <img src={TrashIcon} alt="addbutton" />
                </span>
                 Deleted
              </button>
            </div>
          </Link>
        </div>
      );
  }

}

export default withRouter(MenuBar);