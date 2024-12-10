// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAeQNQ2jPkyJ_88G1BYNpZg62EToIX5Tg4',
  authDomain: 'auth.pollixia.com',
  projectId: 'pollixia-b9bdb',
  storageBucket: 'pollixia-b9bdb.firebasestorage.app',
  messagingSenderId: '71110692201',
  appId: '1:71110692201:web:c90659a37bbdb51edd41f8',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Google auth provider
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const auth = getAuth(app);
