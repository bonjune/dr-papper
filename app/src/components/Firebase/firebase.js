import React from "react";

import app from "firebase/app";
import "firebase/database";

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET, 
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase extends React.Component {
    constructor(props) {
        super(props);
        app.initializeApp(config);

        this.db = app.database();
        this.reviewListRef = this.db.ref(`reviews`)
    }


    // Interfaces for Firebase Database API
    getReviews = () => this.reviewListRef;

    makeNewPapperReview = (entry) => {
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