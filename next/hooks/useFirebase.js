
import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from './firebase-config';

let app;

export function useFirebase() {
  const [firebaseApp, setFirebaseApp] = useState(null);

  useEffect(() => {
    if (!app) {
      app = initializeApp(firebaseConfig);
    }
    setFirebaseApp(app);
  }, []);

  return { app: firebaseApp, auth: firebaseApp ? getAuth(firebaseApp) : null };
}