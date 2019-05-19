import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

export const sanitizeTag = functions.database.ref('/tags/{tag}')
    .onWrite((snapshot, context) => {
    const data = snapshot.after.val();
    if (data.reviews === null || data.reviews === undefined) {
        const target = context.params.tag;
        return admin.database().ref(`tags/${target}`).remove();
    }
    return; 
})