import { useEffect, useState } from "react";
import {
  subscribeAuth,
  ensureSignedIn,
  logout,
  signInWithGoogle,
  signUpWithEmail,
  signInWithEmail,
  sendReset,
  linkAnonymousToEmail,
} from "../firebase/index";

export default function AuthMenu() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mode, setMode] = useState("login"); // login | signup | reset

  useEffect(() => {
    ensureSignedIn().catch(() => {});
    const unsub = subscribeAuth((u) => setUser(u));
    return unsub;
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (mode === "login") {
        await signInWithEmail(email, password);
      } else if (mode === "signup") {
        await signUpWithEmail(email, password, name);
      } else if (mode === "reset") {
        await sendReset(email);
        alert("تم إرسال رابط إعادة التعيين إلى بريدك.");
      }
      setOpen(false);
      setEmail("");
      setPassword("");
      setName("");
    } catch (e) {
      alert("تعذر تنفيذ العملية: " + (e?.message || ""));
    }
  }

  return (
    <div className="auth-menu-container">
      {user ? (
        <>
          <span
            className="btn btn-ghost user-display"
            title={user.email || user.uid}
          >
            {user.displayName || user.email || "مستخدم"}
          </span>
          <button className="btn btn-outline btn-sm" onClick={() => logout()}>
            خروج
          </button>
        </>
      ) : (
        <>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setOpen(true)}
          >
            دخول/تسجيل
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={async () => {
              try {
                await signInWithGoogle();
              } catch {}
            }}
          >
            Google
          </button>
        </>
      )}

      {open && (
        <div
          className="custom-framework modal-container"
          role="dialog"
          aria-modal="true"
        >
          <button
            className="custom-framework modal-underlay"
            onClick={() => setOpen(false)}
            aria-label="إغلاق"
          />
          <div className="custom-framework modal-content">
            <div className="auth-mode-tabs">
              <button
                className={`btn ${
                  mode === "login" ? "btn-primary" : "btn-ghost"
                } btn-sm`}
                onClick={() => setMode("login")}
              >
                تسجيل دخول
              </button>
              <button
                className={`btn ${
                  mode === "signup" ? "btn-primary" : "btn-ghost"
                } btn-sm`}
                onClick={() => setMode("signup")}
              >
                حساب جديد
              </button>
              <button
                className={`btn ${
                  mode === "reset" ? "btn-primary" : "btn-ghost"
                } btn-sm`}
                onClick={() => setMode("reset")}
              >
                نسيت كلمة السر
              </button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {mode === "signup" && (
                <label>
                  الاسم
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="اسمك"
                  />
                </label>
              )}
              <label>
                البريد الإلكتروني
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </label>
              {mode !== "reset" && (
                <label>
                  كلمة المرور
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </label>
              )}
              <div className="auth-actions">
                <button type="submit" className="btn btn-primary">
                  تم
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setOpen(false)}
                >
                  إلغاء
                </button>
              </div>
            </form>
            <div className="auth-social">
              <button
                className="btn btn-outline"
                onClick={async () => {
                  try {
                    await signInWithGoogle();
                    setOpen(false);
                  } catch {}
                }}
              >
                دخول بـ Google
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
