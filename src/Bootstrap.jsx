import { useEffect } from "react";
import App from "./App.jsx";
import { usePrograms } from "./zustand-1/Zustand-Programs.jsx";

export default function Bootstrap() {
  const initFromStorage = usePrograms((s) => s.initFromStorage);

  useEffect(() => {
    initFromStorage();
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").catch(() => {});
      });
    }
  }, [initFromStorage]);

  return <App />;
}
