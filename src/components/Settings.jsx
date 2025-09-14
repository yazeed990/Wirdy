import { useEffect, useRef, useState } from "react";
import { usePrograms } from "../zustand-1/Zustand-Programs.jsx";
import {
  ensureSignedIn,
  loadProgress,
  saveProgress,
  signInWithGoogle,
} from "../firebase/index";

export default function Settings({ open, onClose }) {
  const selectedProgram = usePrograms((s) => s.selectedProgram);
  const [time, setTime] = useState("06:00");
  const fileRef = useRef(null);

  useEffect(() => {
    try {
      const t = localStorage.getItem("Quran-reminder-time");
      if (t) setTime(t);
    } catch (error) {
      console.error("Settings error:", error);
    }
  }, []);

  if (!open) return null;

  const programKey = `Quran-tracker-${selectedProgram?.name || "fiveShields"}`;

  function exportData() {
    try {
      const raw = localStorage.getItem(programKey) || "{}";
      const blob = new Blob([raw], { type: "application/json;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${selectedProgram?.name || "fiveShields"}-progress.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Settings error:", error);
    }
  }

  function importData(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        localStorage.setItem(programKey, JSON.stringify(parsed));
        window.dispatchEvent(
          new CustomEvent("quran-progress-updated", {
            detail: { programName: selectedProgram?.name, data: parsed },
          })
        );
        alert("تم استيراد البيانات بنجاح.");
      } catch {
        alert("ملف غير صالح.");
      }
    };
    reader.readAsText(file);
  }

  async function enableReminders() {
    if (!("Notification" in window)) {
      alert("التنبيهات غير مدعومة في هذا المتصفح.");
      return;
    }
    let permission = Notification.permission;
    if (permission !== "granted") {
      permission = await Notification.requestPermission();
    }
    if (permission !== "granted") return;
    try {
      localStorage.setItem("Quran-reminder-time", time);
      scheduleNext(time);
      alert("تم تفعيل التذكير اليومي.");
    } catch (error) {
      console.error("Settings error:", error);
    }
  }

  function scheduleNext(hhmm) {
    const [hh, mm] = hhmm.split(":").map((n) => parseInt(n, 10));
    const now = new Date();
    const target = new Date();
    target.setHours(hh, mm, 0, 0);
    if (target <= now) target.setDate(target.getDate() + 1);
    const delay = target.getTime() - now.getTime();
    window.setTimeout(() => {
      try {
        new Notification("وردي", { body: "حان وقت وردك اليومي!" });
      } catch (error) {
        console.error("Settings error:", error);
      }
      // schedule the next one
      scheduleNext(hhmm);
    }, delay);
  }

  return (
    <div
      className="custom-framework modal-container"
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-title"
    >
      <button
        className="custom-framework modal-underlay"
        onClick={onClose}
        aria-label="إغلاق"
      />
      <div className="custom-framework modal-content">
        <h2 id="settings-title">الإعدادات</h2>
        <div className="flex flex-col gap-3">
          <div className="card">
            <h4>التذكير اليومي</h4>
            <label htmlFor="reminder-time">وقت التذكير</label>
            <input
              id="reminder-time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            <div className="settings-actions">
              <button className="btn btn-primary" onClick={enableReminders}>
                تفعيل التذكير
              </button>
            </div>
          </div>

          <div className="card">
            <h4>نسخ البيانات</h4>
            <div className="settings-actions">
              <button className="btn btn-secondary" onClick={exportData}>
                تصدير التقدم
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => fileRef.current?.click()}
              >
                استيراد التقدم
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="application/json"
                className="hidden"
                onChange={(e) => importData(e.target.files?.[0])}
              />
            </div>
          </div>

          <div className="card">
            <h4>المزامنة السحابية</h4>
            <div className="settings-actions">
              <button
                className="btn btn-primary"
                onClick={async () => {
                  try {
                    await signInWithGoogle();
                    alert("تم تسجيل الدخول عبر Google.");
                  } catch (error) {
                    console.error("Settings error:", error);
                  }
                }}
              >
                تسجيل دخول Google
              </button>
              <button
                className="btn btn-secondary"
                onClick={async () => {
                  try {
                    const user = await ensureSignedIn();
                    const cloud = await loadProgress(
                      user.uid,
                      selectedProgram?.name || "fiveShields"
                    );
                    if (!cloud) {
                      alert("لا توجد بيانات على السحابة لهذا البرنامج.");
                      return;
                    }
                    localStorage.setItem(programKey, JSON.stringify(cloud));
                    window.dispatchEvent(
                      new CustomEvent("quran-progress-updated", {
                        detail: {
                          programName: selectedProgram?.name,
                          data: cloud,
                        },
                      })
                    );
                    alert("تم سحب البيانات من السحابة.");
                  } catch {
                    alert("تعذر السحب من السحابة.");
                  }
                }}
              >
                سحب من السحابة
              </button>
              <button
                className="btn btn-primary"
                onClick={async () => {
                  try {
                    const user = await ensureSignedIn();
                    const raw = localStorage.getItem(programKey) || "{}";
                    const data = JSON.parse(raw);
                    await saveProgress(
                      user.uid,
                      selectedProgram?.name || "fiveShields",
                      data
                    );
                    alert("تم رفع البيانات إلى السحابة.");
                  } catch {
                    alert("تعذر الرفع إلى السحابة.");
                  }
                }}
              >
                رفع إلى السحابة
              </button>
            </div>
          </div>

          <div className="card">
            <h4>تنظيف</h4>
            <button
              className="btn btn-outline btn-destructive"
              onClick={() => {
                try {
                  localStorage.removeItem(programKey);
                  window.dispatchEvent(
                    new CustomEvent("quran-progress-updated", {
                      detail: { programName: selectedProgram?.name, data: {} },
                    })
                  );
                  alert("تم مسح التقدم لهذا البرنامج.");
                } catch (error) {
                  console.error("Settings error:", error);
                }
              }}
            >
              مسح تقدم البرنامج الحالي
            </button>
          </div>
        </div>
        <div className="settings-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
}
