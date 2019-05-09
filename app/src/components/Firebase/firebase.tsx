/**
 * Author: Bongjun Jang
 * 
 * Firebase Class to make API Calls
 */

import React from "react";

import app from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";
import config from "./config";

// Review Entry Template
import { IReview, ITag } from './interface';

class Firebase extends React.Component<any, {}> {
  auth: firebase.auth.Auth;
  db: firebase.database.Database;
  storage: firebase.storage.Storage;
  constructor(props: any) {
    super(props);

    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();
    this.storage = app.storage();
  }

  /**
   * Section 1. Authentication API Calls
   */

  doCreateUserWithEmailAndPassword = (email: string, password: string) =>
    this.auth.createUserWithEmailAndPassword(email, password);
  
  doSignInWithEmailAndPassword = (email: string, password: string) =>
    this.auth.signInWithEmailAndPassword(email, password);
  
  doSignOut = () => this.auth.signOut();

  doPasswordUpdate = (email: string) => this.auth.sendPasswordResetEmail(email);

  onAuthUserListener = (next: any, fallback: any) =>
    this.auth.onAuthStateChanged((authUser: app.User | null) => {
      // authUser is logged in (not null)
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();

            // default empty roles
            if (!dbUser.roles) {
                dbUser.roles = {};
            }

            // merge auth and db user
            (authUser as app.User) = {
                uid: authUser.uid,
                email: authUser.email,
                emailVerified: authUser.emailVerified,
                providerData: authUser.providerData,
                ...dbUser,
            };
            next(authUser);
          });
      }
      // authUser is not logged in (null)
      else {
        fallback();
      }
  });  

  /**
   * Section 2. DB API Calls
   * 
   * How to Use
   * 1. Do not implement callbacks in this class,
   *  which makes slow down the system
   * 2. It's better to call callback functions in a component,
   *  to change state of component
   */

  user = (uid: string) => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  review = (reviewKey: string) => this.db.ref(`reviews/${reviewKey}`);

  reviews = () => this.db.ref(`reviews`);

  tag = (tagKey: string) => this.db.ref(`tags/${tagKey}`);

  tags = () => this.db.ref('tags');

  makeNewPapperReview = (entry: IReview) => {
      const newReviewRef = this.reviews().push();
      newReviewRef.set({
          ...entry
      })
  }

  updatePapperReview = (reviewKey: string, entry: IReview) => {
      const targetReviewRef = this.db.ref(`reviews/${reviewKey}`);
      let updates = {};
      updates[`reviews/${reviewKey}`] = entry;
      targetReviewRef.update(updates);
  }

  deletePapperReview = (reviewKey: string) => {
      const targetReviewRef = this.db.ref(`reviews/${reviewKey}`);
      targetReviewRef.remove();
  }

  makeNewTag = (tagName: string) => {
    const newTagRef = this.tags().push();
    newTagRef.set(({
      name: tagName,
      reviews: []
    } as ITag));
    return newTagRef.key;
  }

  uploadFigure = (figure: any, filename: string) => {
    const targetRef = this.storage.ref().child(filename);

    targetRef.put(figure).then(function(snapshot) {
      console.log('Uploaded a blob or file!');
    });

  }

}

export default Firebase;