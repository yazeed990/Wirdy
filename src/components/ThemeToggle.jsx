import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mode, setMode] = useState(
    () => localStorage.getItem("theme-mode") || "auto"
  );

  useEffect(() => {
    const root = document.documentElement;
    if (mode === "dark") {
      root.setAttribute("data-theme", "dark");
    } else if (mode === "light") {
      root.setAttribute("data-theme", "light");
    } else {
      root.removeAttribute("data-theme");
    }
    localStorage.setItem("theme-mode", mode);
  }, [mode]);

  return (
    <button
      className="btn btn-ghost btn-sm"
      onClick={() => setMode(mode === "light" ? "dark" : "light")}
      title={
        mode === "dark" ? "تبديل إلى الوضع الفاتح" : "تبديل إلى الوضع الداكن"
      }
    >
      {mode === "dark" ? "فاتح" : "داكن"}
    </button>
  );
}
