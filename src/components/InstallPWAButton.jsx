import { useEffect, useState } from "react";

export default function InstallPWAButton() {
  const [deferred, setDeferred] = useState(null);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    const onBefore = (e) => {
      e.preventDefault();
      setDeferred(e);
      setSupported(true);
    };
    window.addEventListener("beforeinstallprompt", onBefore);
    return () => window.removeEventListener("beforeinstallprompt", onBefore);
  }, []);

  if (!supported) return null;

  return (
    <button
      className="btn btn-outline btn-sm"
      onClick={async () => {
        try {
          await deferred.prompt();
          const { outcome } = await deferred.userChoice;
          if (outcome) setDeferred(null);
        } catch (error) {
          console.error("Failed to install PWA:", error);
        }
      }}
      title="تثبيت التطبيق على جهازك"
    >
      تثبيت التطبيق
    </button>
  );
}
