import React from "react";
import { Link, withRouter } from "react-router-dom";
import { AuthUserContext } from "../../components/Auth/Session";
import * as ROUTES from "../../constants/routes";

const HomePageBase = () => (
  <AuthUserContext.Consumer>
    {authUser => authUser
      ? <p>Hello!</p>
      : <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    }
  </AuthUserContext.Consumer>
)

const HomePage = withRouter(HomePageBase);

export default HomePage;