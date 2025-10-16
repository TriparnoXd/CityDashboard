import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFirebaseConfig } from './config';

export function initializeFirebase() {
  const firebaseConfig = getFirebaseConfig();
  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  const auth = getAuth(app);
  const firestore = getFirestore(app);

  return { app, auth, firestore };
}

export { useUser } from './auth/use-user';
export {
  FirebaseProvider,
  useFirebaseApp,
  useAuth,
  useFirestore,
} from './provider';
export { FirebaseClientProvider } from './client-provider';
