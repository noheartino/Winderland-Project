
import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from './firebase-config';

let app;
let auth;

export function useFirebase() {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(() => {
    if (!app) {
      app = initializeApp(firebaseConfig);
      auth = getAuth(app);
      setFirebaseInitialized(true);
    }
  }, []);


  return { app, auth, firebaseInitialized };
}