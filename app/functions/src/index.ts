import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//


const serviceAccount = require(
    "../dr-papper-firebase-adminsdk-xjaxa-58afcfa88d.json"
);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://dr-papper.firebaseio.com"
})

export const sanitizeTag = functions.database.ref('/tags/{tag}')
    .onUpdate((snapshot, context) => {
    const data = snapshot.after.val();
    if (data) { // When the tag exists
        // Remove a tag with null or undefined tags
        if (data.reviews === null || data.reviews === undefined) {
            const target = context.params.tag;
            return admin.database().ref(`tags/${target}`).remove();
        }
    }
    return new Promise<void>((resolve, reject) => null);
})

export const maintainUsername = functions.database.ref('reviews/{review}')
  .onUpdate((snapshot, context) => {
  });