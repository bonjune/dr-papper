import React from "react";
// import { Link } from "react-router-dom";
// import { withAuthentication, withAuthorization } from "../../components/Auth/Session";
import * as ROUTES from "../../constants/routes";
// import { compose } from 'recompose';
import { RouterProps } from 'react-router';

class HomePage extends React.Component<RouterProps> {
  constructor(props: RouterProps) {
    super(props)
  }

  componentDidMount() {
    this.props.history.push(ROUTES.READ);
  }

  render() {
    return (
      <div className="home-page">
      </div>
    )
  }
}

// const condition = (authUser: any) => authUser != null;

// const HomePage = compose(
//   withAuthentication,
//   withAuthorization(condition)
// )(HomePageBase);

export default HomePage;