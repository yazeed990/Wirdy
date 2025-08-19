import { useEffect, useState } from "react";
import { ensureSignedIn, subscribeAuth } from "../firebase/index";

export default function SyncIndicator() {
  const [uid, setUid] = useState(null);

  useEffect(() => {
    ensureSignedIn()
      .then((u) => setUid(u?.uid))
      .catch(() => {});
    const unsub = subscribeAuth((u) => setUid(u?.uid || null));
    return unsub;
  }, []);

  return (
    <span
      className="badge badge-success"
      title={uid ? `متصل: ${uid.substring(0, 6)}...` : "غير متصل"}
    >
      {uid ? "متزامن" : "غير متصل"}
    </span>
  );
}
