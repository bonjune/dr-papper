import React, { Component } from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Form,
    Input,
    Button } from 'reactstrap';

import * as ROUTES from "../../constants/routes";

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
          <div>
            <Navbar color="light" light expand="md">
              <NavbarBrand href={ROUTES.HOME}>
                Dr.Papper
              </NavbarBrand>
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <Form inline={true} className="searchForm">
                    <Input type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                  </Form>
                  <NavItem>
                    <NavLink href={ROUTES.COMPONENTS}>
                      Components
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="https://github.com/reactstrap/reactstrap">
                      Login
                    </NavLink>
                  </NavItem>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Setting
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>
                        Option 1
                      </DropdownItem>
                      <DropdownItem>
                        Option 2
                      </DropdownItem>
                      <DropdownItem divider={true} />
                      <DropdownItem>
                        Reset
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
        );
      }

}

export default NavigationBar;