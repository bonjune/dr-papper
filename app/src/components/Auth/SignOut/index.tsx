import React from 'react';

import Firebase from "../../Firebase";
import { withFirebase } from "../../Firebase";

function SignOutButton({ firebase }: { firebase: Firebase}) {
  return (
    <button type="button" className="signout-btn btn text-uppercase" style={{width: "100%", fontSize: "100%"}} onClick={firebase.doSignOut}>
      Sign Out
    </button>
  );
}

export default withFirebase(SignOutButton);