/**
 * Author: Bongjun Jang
 */
import React from "react";
import Firebase from '.';

const FirebaseContext = React.createContext<Firebase | null>(null);

export const withFirebase = (Component: any) => (props: any) => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
)

export interface IFirebaseProps {
  firebase: Firebase
}

export default FirebaseContext;