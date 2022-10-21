import * as admin from "firebase-admin";

//TODO throw errors if env not set
const config = JSON.parse(process.env.FIREBASE_CRED);

export const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert({
    projectId: config.project_id,
    clientEmail: config.client_email,
    privateKey: config.private_key,
  }),
});
