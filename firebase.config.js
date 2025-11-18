// firebase.config.js
import Constants from 'expo-constants';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';

// Default placeholder config — replace these values via app.json or directly here during development.
const defaultConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-app",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "YOUR_ID",
  appId: "YOUR_APP_ID"
};

// Prefer config from Expo app.json extra
const expoExtra = (Constants?.expoConfig || Constants?.manifest)?.extra || {};
const firebaseConfig = expoExtra.firebaseConfig || defaultConfig;

let firebaseApp;
if (!getApps().length) {
  try {
    firebaseApp = initializeApp(firebaseConfig);
  } catch (e) {
    console.warn('Firebase init error:', e.message);
  }
} else {
  firebaseApp = getApps()[0];
}

let db = null;
let auth = null;

try {
  if (firebaseApp) {
    db = getFirestore(firebaseApp);
    auth = getAuth(firebaseApp);

    // sign in anonymously (safe for simple private data). Wrap in try/catch to avoid crashing.
    signInAnonymously(auth).catch((err) => {
      // If anonymous sign-in is disabled in the console, this will fail — handle gracefully.
      console.warn('Anonymous sign-in failed:', err.message);
    });
  }
} catch (e) {
  console.warn('Failed to initialize Firebase services:', e.message);
}

export { firebaseApp as app, db, auth, firebaseConfig };