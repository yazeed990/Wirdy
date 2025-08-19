import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./s-css.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import App from "./App.jsx";
import { usePrograms } from "./zustand-1/Zustand-Programs.jsx";

function Bootstrap() {
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

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Bootstrap />
  </StrictMode>
);
