import React from "react";
import { Link } from "react-router-dom";
import { AuthUserContext, withAuthentication } from "../../components/Auth/Session";
import * as ROUTES from "../../constants/routes";

const HomePageBase = () => (
  <AuthUserContext.Consumer>
    {authUser => authUser
      ? <p>Hello!</p>
      : <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    }
  </AuthUserContext.Consumer>
)

const HomePage = withAuthentication(HomePageBase);

export default HomePage;