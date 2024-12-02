import admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config({ path: `${process.cwd()}/dev.env` });

const { FIREBASE_KEY } = process.env;

if (FIREBASE_KEY) {
  const firebaseKey = JSON.parse(FIREBASE_KEY);

  admin.initializeApp({
    credential: admin.credential.cert(firebaseKey),
  });
}
