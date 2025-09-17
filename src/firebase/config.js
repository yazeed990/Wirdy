// Firebase configuration - production config hardcoded for Free Netlify plan
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBCgGrWvoQw_7gooTQHZpYcqhEEk8-qbf0",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "weirdy-a9be1.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "weirdy-a9be1",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "weirdy-a9be1.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID || "109828981298",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:109828981298:web:9bd0476808d333c65bf22b",
};

// Check if we have valid Firebase config
export const hasValidFirebaseConfig = () => {
  const hasConfig = !!(
    firebaseConfig.apiKey && firebaseConfig.apiKey !== "demo-api-key" &&
    firebaseConfig.authDomain && firebaseConfig.authDomain !== "demo-project.firebaseapp.com" &&
    firebaseConfig.projectId && firebaseConfig.projectId !== "demo-project"
  );

  // Debug logging
  console.log("Firebase Config Check:", {
    hasApiKey: !!import.meta.env.VITE_FIREBASE_API_KEY,
    hasAuthDomain: !!import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    hasProjectId: !!import.meta.env.VITE_FIREBASE_PROJECT_ID,
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY
      ? import.meta.env.VITE_FIREBASE_API_KEY.substring(0, 10) + "..."
      : "MISSING",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "MISSING",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "MISSING",
    environment: import.meta.env.MODE,
    isProduction: import.meta.env.PROD,
    allEnvVars: Object.keys(import.meta.env).filter((key) =>
      key.startsWith("VITE_FIREBASE")
    ),
  });

  return hasConfig;
};
