import React from "react";

import app from "firebase/app";
import "firebase/database";
import "firebase/storage";
import config from "./config";

// Review Entry Template
import { reviewEntry } from "../Firebase/reviewEntry"

class Firebase extends React.Component {
  constructor(props) {
    super(props);
    app.initializeApp(config);

    this.db = app.database();
    this.storage = app.storage();
    this.reviewListRef = this.db.ref(`reviews`);
    this.storageRef = this.storage.ref();
  }

    // Test functions
  pushDummyReview = (event) => {
      const dummy = this.reviewListRef.push();
      let entry = reviewEntry;
      entry.title = "Hello Firebase!";
      entry.authors = "Jimmy Raynor";
      entry.comment = "Go jim Go";
      entry.link = "www.google.com";
      entry["publishDate "] = "Doom's Day";
      entry.toRead = true;
      entry.pinned = false;
      dummy.set({
          ...entry
      })
  }


  // Interfaces for Firebase Database API
  getReviews = () => this.reviewListRef;

  makeNewPapperReview = (entry) => {
      console.log(entry);
      debugger;
      const newReviewRef = this.reviewListRef.push();
      
      entry.reviewId = newReviewRef.key;

      newReviewRef.set({
          ...entry
      })
  }
  updatePapperReview = (reviewKey, entry) => {
      const targetReviewRef = this.db.ref(`reviews/${reviewKey}`);
      let updates = {};
      updates[`reviews/${reviewKey}`] = entry;
      targetReviewRef.update(updates);
  }
  deletePapperReview = (reviewKey) => {
      const targetReviewRef = this.db.ref(`reviews/${reviewKey}`);
      targetReviewRef.remove();
  }

  uploadFigure = (figure, filename) => {
    const targetRef = this.storageRef.child(filename);

    targetRef.put(figure).then(function(snapshot) {
      console.log('Uploaded a blob or file!');
    });

  }
}

export default Firebase;