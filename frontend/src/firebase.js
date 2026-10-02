// src/firebase.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const hasConfig = !!(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.appId
);

if (hasConfig) {
  try {
    if (!firebase.apps?.length) {
      firebase.initializeApp(firebaseConfig);
    }
  } catch (error) {
    console.error("Firebase initialization error", error);
  }
} else {
  console.warn("Firebase disabled: VITE_FIREBASE_* env vars not set");
}

// Stub auth so imports don't crash when Firebase is unconfigured
const auth = hasConfig
  ? firebase.auth()
  : {
      onAuthStateChanged: () => () => {},
      signInWithPopup: () => Promise.reject(new Error("Firebase not configured")),
      signInWithEmailAndPassword: () => Promise.reject(new Error("Firebase not configured")),
      createUserWithEmailAndPassword: () => Promise.reject(new Error("Firebase not configured")),
      signOut: () => Promise.resolve(),
      currentUser: null,
    };

export { auth, firebase, hasConfig };
