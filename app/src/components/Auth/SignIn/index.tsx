import React from "react";
import { withFirebase } from "../../Firebase";
import * as ROUTES from "../../../constants/routes"
import { compose } from 'recompose';
import { SignUpLink } from "../SignUp";
import { withRouter } from 'react-router';

interface ISignInForm {
  email: string;
  password: string;
}

const SignInFormInit = {
  email: "",
  password: ""
}

const SignInPage = () => (
  <div className="sign-in">
    <SignInForm/>
    <hr/>
    <SignUpLink/>
  </div>

);

class SignInFormBase extends React.Component<any, ISignInForm> {
  constructor(props: any) {
    super(props)
    this.state = {
      ...SignInFormInit
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
        this.props.history.push(ROUTES.HOME);
      })
      .catch((error: any) => {
        this.setState(current => ({
          ...current,
          error
        }));
      });

    event.preventDefault();
  }

  render() {
    return (
      <div className="sign-in-form">
        <form onSubmit={this.onSubmit}>
          <input
            name="email"
            onChange={this.onChange}
            type="text"
            placeholder="Your Email"
          />
          <input
            name="password"
            onChange={this.onChange}
            type="password"
            placeholder="Your Password"
          />
          <button type="submit">
            Sign In
          </button>
        </form>
      </div>
      
    )
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase);
export default SignInPage;