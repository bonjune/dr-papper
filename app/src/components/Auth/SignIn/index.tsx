import React, { FormEvent, ChangeEvent } from "react";
import withFirebase from "../../Firebase";
import { compose } from "recompose";
import * as ROUTES from "../../../constants/routes"

interface ISignInForm {
  email: string;
  password: string;
}

const SignInFormInit = {
  email: "",
  password: ""
}

class SignInFormBase extends React.Component<any, ISignInForm> {
  constructor(props: any) {
    super(props)
    this.state = {
      ...SignInFormInit
    }
  }

  onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    this.setState(current => ({
      ...current,
      [target.name]: target.value
    }))
  }

  onSubmit = (event: FormEvent<HTMLFormElement>) => {
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
      <div className="sign-in">
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
            type="text"
            placeholder="Your Password"
          />
        </form>
      </div>
      
    )
  }
}

export default compose(
  withFirebase
)(SignInFormBase);