import React from "react";
import { Link } from "react-router-dom";
import { AuthUserContext, withAuthentication, withAuthorization } from "../../components/Auth/Session";
import * as ROUTES from "../../constants/routes";
import { compose } from 'recompose';

const HomePageBase = () => (
  <AuthUserContext.Consumer>
    {authUser => authUser
      ? <p>Hello!</p>
      : <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    }
  </AuthUserContext.Consumer>
)

const condition = (authUser: any) => authUser != null;

const HomePage = compose(
  withAuthentication,
  withAuthorization(condition)
)(HomePageBase);

export default HomePage;