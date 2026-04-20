import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCrfCEwG8gBf9LJJaj6vy1o8C3fWjBjbAA",
  authDomain: "silentstress-b3937.firebaseapp.com",
  projectId: "silentstress-b3937",
  storageBucket: "silentstress-b3937.firebasestorage.app",
  messagingSenderId: "519166231493",
  appId: "1:519166231493:web:e6f6d51b1a2e63fdcd41ac",
  measurementId: "G-EEWNN067FL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getDatabase(app);

// Initialize Analytics (only in browser)
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { analytics };
export default app;