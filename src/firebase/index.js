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
import { firebaseConfig } from "./config";
let analyticsInitTried = false;

let app;
let auth;
let db;

export function initFirebase() {
  if (!app) {
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
  }
  return { app, auth, db };
}

export async function ensureSignedIn() {
  const { auth } = initFirebase();
  if (auth.currentUser) return auth.currentUser;
  const result = await signInAnonymously(auth);
  return result.user;
}

export async function signInWithGoogle() {
  const { auth } = initFirebase();
  const provider = new GoogleAuthProvider();
  const res = await signInWithPopup(auth, provider);
  return res.user;
}

export async function signUpWithEmail(email, password, displayName) {
  const { auth } = initFirebase();
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
  const res = await signInWithEmailAndPassword(auth, email, password);
  return res.user;
}

export async function sendReset(email) {
  const { auth } = initFirebase();
  await sendPasswordResetEmail(auth, email);
}

export async function linkAnonymousToEmail(email, password) {
  const { auth } = initFirebase();
  if (!auth.currentUser) throw new Error("No user");
  const cred = EmailAuthProvider.credential(email, password);
  const res = await linkWithCredential(auth.currentUser, cred);
  return res.user;
}

export async function logout() {
  const { auth } = initFirebase();
  await signOut(auth);
}

export function subscribeAuth(callback) {
  const { auth } = initFirebase();
  return onAuthStateChanged(auth, callback);
}

export async function loadProgress(uid, programName) {
  const { db } = initFirebase();
  const ref = doc(db, "progress", `${uid}__${programName}`);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}

export async function saveProgress(uid, programName, data) {
  const { db } = initFirebase();
  const ref = doc(db, "progress", `${uid}__${programName}`);
  await setDoc(ref, data, { merge: true });
}

export function subscribeProgress(uid, programName, callback) {
  const { db } = initFirebase();
  const ref = doc(db, "progress", `${uid}__${programName}`);
  return onSnapshot(ref, (snap) => {
    if (snap.exists()) callback(snap.data());
  });
}
