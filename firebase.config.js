// firebase.config.js
import Constants from 'expo-constants';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Default placeholder config — replace these values by adding the real config
// into app.json (expo.extra.firebaseConfig) or replace directly here during development.
const defaultConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-app",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "YOUR_ID",
  appId: "YOUR_APP_ID"
};

// Prefer config from Expo app.json extra (expo publish-safe), fall back to default.
const expoExtra = (Constants?.expoConfig || Constants?.manifest)?.extra || {};
const firebaseConfig = expoExtra.firebaseConfig || defaultConfig;

// Initialize Firebase only once
let app = undefined;
if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
  } catch (e) {
    // In case initialization fails, app remains undefined. Caller should guard against that.
    console.warn('Firebase init error:', e.message);
  }
} else {
  app = getApps()[0];
}

let db = null;
try {
  if (app) db = getFirestore(app);
} catch (e) {
  console.warn('Failed to get Firestore instance:', e.message);
}

export { db, firebaseConfig, app };