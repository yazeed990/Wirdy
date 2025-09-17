// Firebase configuration - uses environment variables
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Check if we have valid Firebase config
export const hasValidFirebaseConfig = () => {
  const hasConfig = !!(
    import.meta.env.VITE_FIREBASE_API_KEY &&
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN &&
    import.meta.env.VITE_FIREBASE_PROJECT_ID
  );
  
  // Debug logging
  console.log("Firebase Config Check:", {
    hasApiKey: !!import.meta.env.VITE_FIREBASE_API_KEY,
    hasAuthDomain: !!import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    hasProjectId: !!import.meta.env.VITE_FIREBASE_PROJECT_ID,
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY ? "SET" : "MISSING",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "MISSING",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "MISSING",
    environment: import.meta.env.MODE,
    isProduction: import.meta.env.PROD,
  });
  
  return hasConfig;
};