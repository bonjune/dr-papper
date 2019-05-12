import React from "react";
import { withFirebase } from "../../Firebase";
import * as ROUTES from "../../../constants/routes"
import { compose } from 'recompose';
import { SignUpLink } from "../SignUp";
import { withRouter } from 'react-router';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Label, Col, Row, Input } from 'reactstrap';


interface ISignInForm {
  email: string;
  password: string;
  signModalShow: boolean;
}

const SignInFormInit = {
  email: "",
  password: ""
}

const SignInPage = () => (
  <div className="sign-in">
    <SignInForm/>
  </div>

);

class SignInFormBase extends React.Component<any, ISignInForm> {
  constructor(props: any) {
    super(props)
    this.state = {
      ...SignInFormInit,
      signModalShow : true,
    }
  }

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    this.setState(current => ({
      ...current,
      [target.name]: target.value
    }))
  }

  onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        // Reset form to the empty one
        this.setState({ ...SignInFormInit });
        this.props.history.push(ROUTES.READ);
      })
      .catch((error: any) => {
        this.setState(current => ({
          ...current,
          error
        }));
      });

    event.preventDefault();
  }

  toggle = () => {
    this.setState(prevState => ({
      signModalShow: !prevState.signModalShow,
    }));
  }

  render() {
    return (
      <Modal isOpen={this.state.signModalShow} size="lg">
        <ModalHeader
          style={{padding: 0, textAlign:'center', height: "70px", verticalAlign: "center"}}
          cssModule={{ 'modal-title': 'w-100 mb-0' }}>
          <div style={{ fontSize: "26px", marginTop: "22px" }}>
            Sign in
          </div>
        </ModalHeader>
        <form style={{width: "100%"}} onSubmit={this.onSubmit}>
          <ModalBody>
                <Row>
                  <Col lg="2"><Label size="lg" style={{textAlign:"right"}}>Email</Label></Col>
                  <Col lg="10"><Input type="text" name="email" bsSize="lg" placeholder="Your Email" onChange={this.onChange}/></Col>
                </Row>
                <Row>
                  <Col lg="2"><Label size="lg" style={{textAlign:"right"}}>Password</Label></Col>
                  <Col lg="10"><Input type="password" name="password" bsSize="lg" placeholder="Your Password" onChange={this.onChange}/></Col>
                </Row>
                <Row>
                  <Col lg="12" style={{marginTop: "8px"}}><SignUpLink/></Col>
                </Row>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" block style={{background:"#B0BEC5", border:"0"}} onClick={this.toggle}>Sign in</Button>
          </ModalFooter>
        </form>
      </Modal>
    )
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase);
export default SignInPage;