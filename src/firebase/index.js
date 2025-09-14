import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInAnonymously,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  linkWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  enableIndexedDbPersistence,
} from "firebase/firestore";
import { firebaseConfig, hasValidFirebaseConfig } from "./config";
let analyticsInitTried = false;

let app;
let auth;
let db;
let isFirebaseEnabled = false;

export function initFirebase() {
  if (!app) {
    try {
      isFirebaseEnabled = hasValidFirebaseConfig();
      if (!isFirebaseEnabled) {
        console.warn(
          "Firebase not configured properly. Running in offline mode."
        );
        return { app: null, auth: null, db: null };
      }

      app = initializeApp(firebaseConfig);
      auth = getAuth(app);
      db = getFirestore(app);

      // Persist auth locally across tabs
      setPersistence(auth, browserLocalPersistence).catch(() => {});
      // Enable offline cache for Firestore
      enableIndexedDbPersistence(db).catch(() => {});

      // Optional: Analytics if measurementId exists
      if (!analyticsInitTried && import.meta.env.VITE_FIREBASE_MEASUREMENT_ID) {
        analyticsInitTried = true;
        import("firebase/analytics")
          .then(({ getAnalytics }) => {
            try {
              getAnalytics(app);
            } catch (error) {
              console.error("Analytics initialization failed:", error);
            }
          })
          .catch(() => {});
      }
    } catch (error) {
      console.error("Firebase initialization failed:", error);
      isFirebaseEnabled = false;
      return { app: null, auth: null, db: null };
    }
  }
  return { app, auth, db };
}

export async function ensureSignedIn() {
  const { auth } = initFirebase();
  if (!auth) {
    // Return mock user for offline mode
    return { uid: "offline-user", isAnonymous: true, email: null };
  }
  if (auth.currentUser) return auth.currentUser;
  const result = await signInAnonymously(auth);
  return result.user;
}

export async function signInWithGoogle() {
  const { auth } = initFirebase();
  if (!auth) throw new Error("Firebase not configured");
  const provider = new GoogleAuthProvider();
  const res = await signInWithPopup(auth, provider);
  return res.user;
}

export async function signUpWithEmail(email, password, displayName) {
  const { auth } = initFirebase();
  if (!auth) throw new Error("Firebase not configured");
  const res = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName) {
    try {
      await updateProfile(res.user, { displayName });
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  }
  return res.user;
}

export async function signInWithEmail(email, password) {
  const { auth } = initFirebase();
  if (!auth) throw new Error("Firebase not configured");
  const res = await signInWithEmailAndPassword(auth, email, password);
  return res.user;
}

export async function sendReset(email) {
  const { auth } = initFirebase();
  if (!auth) throw new Error("Firebase not configured");
  await sendPasswordResetEmail(auth, email);
}

export async function linkAnonymousToEmail(email, password) {
  const { auth } = initFirebase();
  if (!auth) throw new Error("Firebase not configured");
  if (!auth.currentUser) throw new Error("No user");
  const cred = EmailAuthProvider.credential(email, password);
  const res = await linkWithCredential(auth.currentUser, cred);
  return res.user;
}

export async function logout() {
  const { auth } = initFirebase();
  if (!auth) return;
  await signOut(auth);
}

export function subscribeAuth(callback) {
  const { auth } = initFirebase();
  if (!auth) {
    // Call callback with null for offline mode
    callback(null);
    return () => {}; // Return empty unsubscribe function
  }
  return onAuthStateChanged(auth, callback);
}

export async function loadProgress(uid, programName) {
  const { db } = initFirebase();
  if (!db) return null;
  const ref = doc(db, "progress", `${uid}__${programName}`);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}

export async function saveProgress(uid, programName, data) {
  const { db } = initFirebase();
  if (!db) return;
  const ref = doc(db, "progress", `${uid}__${programName}`);
  await setDoc(ref, data, { merge: true });
}

export function subscribeProgress(uid, programName, callback) {
  const { db } = initFirebase();
  if (!db) {
    return () => {}; // Return empty unsubscribe function
  }
  const ref = doc(db, "progress", `${uid}__${programName}`);
  return onSnapshot(ref, (snap) => {
    if (snap.exists()) callback(snap.data());
  });
}

// Helper function to check if Firebase is properly configured
export function isFirebaseConfigured() {
  return hasValidFirebaseConfig();
}
