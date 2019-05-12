import React, { ChangeEvent, FormEvent } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";
import * as ROUTES from "../../../constants/routes";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Label, Col, Row, Input } from 'reactstrap';

import { withFirebase } from "../../Firebase";

interface ISignUpForm {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  error: null;
  signModalShow: boolean;
}

const SignUpFormInit: ISignUpForm = {
  username: "",
  email: "",
  password: "",
  passwordConfirm: "",
  error: null,
  signModalShow: true,
}

class SignUpFormBase extends React.Component<
  any,
  ISignUpForm> {
  constructor(props: any) {
    super(props)
    this.state = {
      ...SignUpFormInit,
      signModalShow: true,
    }
  }

  private validateEmail = (email: string) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  }

  onSignUpFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    this.setState((current) => ({
      ...current,
      [target.name]: target.value
    }));
  }

  onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const { username, email, password } = this.state;
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then((authUser: firebase.auth.UserCredential) => {
        return authUser.user ? this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
          }) : null;
      })
      .then(() => {
        this.setState({
          ...SignUpFormInit
        })
        this.props.history.push(ROUTES.HOME);
      })
      .catch((error: any) => {
        if (error !== undefined) {
          alert(error.message)
        }
        this.setState({ error });
      });
    event.preventDefault();
  }

  toggle = () => {
    this.setState(prevState => ({
      signModalShow: !prevState.signModalShow,
    }));
  }

  render() {
    const validateForm = () => {
      const {
        username,
        email,
        password,
        passwordConfirm
      } = this.state;
      return username !== "" &&
        this.validateEmail(email) &&
        password !== "" &&
        password === passwordConfirm
    }
    return (
      <Modal isOpen={this.state.signModalShow} size="lg">
        <ModalHeader
          style={{padding: 0, textAlign:'center', height: "70px", verticalAlign: "center"}}
          cssModule={{ 'modal-title': 'w-100 mb-0' }}>
          <div style={{ fontSize: "26px", marginTop: "22px" }}>
            Sign up
          </div>
        </ModalHeader>
        <form style={{width: "100%"}} onSubmit={this.onSubmit}>
          <ModalBody>
                <Row>
                  <Col lg="2"><Label size="lg" style={{textAlign:"right"}}>Username</Label></Col>
                  <Col lg="10"><Input type="text" name="username" bsSize="lg" placeholder="Username" onChange={this.onSignUpFormChange}/></Col>
                </Row>
                <Row>
                  <Col lg="2"><Label size="lg" style={{textAlign:"right"}}>Email</Label></Col>
                  <Col lg="10"><Input type="text" name="email" bsSize="lg" placeholder="Your Email" onChange={this.onSignUpFormChange}/></Col>
                </Row>
                <Row>
                  <Col lg="2"><Label size="lg" style={{textAlign:"right"}}>Password</Label></Col>
                  <Col lg="10"><Input type="password" name="password" bsSize="lg" placeholder="Your Password" onChange={this.onSignUpFormChange}/></Col>
                </Row>
                <Row>
                  <Col lg="2"><Label size="lg" style={{textAlign:"right"}}>Password</Label></Col>
                  <Col lg="10"><Input type="password" name="passwordConfirm" bsSize="lg" placeholder="Your Password Again" onChange={this.onSignUpFormChange}/></Col>
                </Row>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" block disabled={!validateForm()} style={{background:"#B0BEC5", border:"0"}} onClick={this.toggle}>Sign in</Button>
          </ModalFooter>
        </form>
      </Modal>
    )
  }
}

export const SignUpPage = () => (
  <div className="sign-up">
    <SignUpForm/>
  </div>
)


export const SignUpLink = () => {
  const sign = " Sign up"
  return (
      <div className="row text-center">
      <div className="col">
      <p>
          Don't have an account?
          <Link
            to={ROUTES.SIGN_UP}
            className="sign-up-link">
            {sign}
          </Link>
      </p>
      </div>
      </div>
  );
}

const SignUpForm = compose(
  withRouter,
  withFirebase
)(SignUpFormBase);

export default SignUpForm;