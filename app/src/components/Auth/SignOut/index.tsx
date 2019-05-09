import React from 'react';

import Firebase from "../../Firebase";
import withFirebase from "../../Firebase";

function SignOutButton({ firebase }: { firebase: Firebase }) {
  return (
    <button type="button" className="signout-btn btn btn-outline-secondary" onClick={firebase.doSignOut}>
      Sign Out
    </button>
  );
}

export default new withFirebase(SignOutButton);