import { useEffect, useMemo, useState } from "react";
import { usePrograms } from "../zustand-1/Zustand-Programs.jsx";

function computeStreaks(entries) {
  const days = entries
    .filter((e) => e.completedAt)
    .map((e) => ({ d: new Date(e.completedAt) }))
    .sort((a, b) => a.d - b.d)
    .map((e) =>
      new Date(e.d.getFullYear(), e.d.getMonth(), e.d.getDate()).getTime()
    );
  if (days.length === 0) return { current: 0, longest: 0 };
  let current = 1;
  let longest = 1;
  for (let i = 1; i < days.length; i++) {
    const diff = (days[i] - days[i - 1]) / (24 * 60 * 60 * 1000);
    if (diff === 1) {
      current += 1;
      longest = Math.max(longest, current);
    } else if (diff > 1) {
      current = 1;
    }
  }
  // adjust for today continuation
  const today = new Date();
  const last = days[days.length - 1];
  const lastDay = new Date(last);
  const delta = Math.floor(
    (new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    ).getTime() -
      last) /
      (24 * 60 * 60 * 1000)
  );
  if (delta > 1) current = 0;
  return { current, longest };
}

export default function Achievements() {
  const selectedProgram = usePrograms((s) => s.selectedProgram);
  const [saved, setSaved] = useState({});

  useEffect(() => {
    if (!selectedProgram?.name) return;
    try {
      const key = `Quran-tracker-${selectedProgram.name}`;
      const raw = localStorage.getItem(key);
      setSaved(raw ? JSON.parse(raw) : {});
    } catch {
      setSaved({});
    }
    const onUpdate = (e) => {
      if (e?.detail?.programName === selectedProgram?.name) {
        setSaved(e.detail.data || {});
      }
    };
    window.addEventListener("quran-progress-updated", onUpdate);
    return () => window.removeEventListener("quran-progress-updated", onUpdate);
  }, [selectedProgram?.name]);

  if (!selectedProgram?.name) return null;

  const entries = Object.values(saved || {});
  const completed = entries.filter((e) => e?.isComplete).length;
  const badges = [];
  if (completed >= 7) badges.push("٧ أيام من الانتظام");
  if (completed >= 30) badges.push("٣٠ يوماً — إنجاز ممتاز");
  if (completed >= 100) badges.push("١٠٠ يوم — همة عالية");
  const { current, longest } = computeStreaks(entries);

  return (
    <section className="card" aria-label="الإنجازات">
      <div className="achievements-container">
        <div className="achievement-badges">
          {badges.length === 0 ? (
            <span className="achievement-message">
              ابدأ رحلتك اليوم لتحصل على أول وسام ✨
            </span>
          ) : (
            badges.map((b, i) => (
              <span key={i} className="achievement-badge">
                {b}
              </span>
            ))
          )}
        </div>
        <div className="achievement-stats">
          <span className="achievement-stat">سلسلة اليوم: {current} يوم</span>
          <span className="achievement-stat">أطول سلسلة: {longest} يوم</span>
        </div>
      </div>
    </section>
  );
}
