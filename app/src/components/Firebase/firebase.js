import React from "react";

import app from "firebase/app";
import "firebase/database";
import config from "./config";

// Review Entry Template
import { reviewEntry } from "../Firebase/reviewEntry"

class Firebase extends React.Component {
    constructor(props) {
        super(props);
        app.initializeApp(config);

        this.db = app.database();
        this.reviewListRef = this.db.ref(`reviews`)
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
}

export default Firebase;