import { useEffect, useMemo, useState } from "react";
import { usePrograms } from "../zustand-1/Zustand-Programs.jsx";

export default function CalendarHeatmap() {
  const selectedProgram = usePrograms((s) => s.selectedProgram);
  const [saved, setSaved] = useState({});

  useEffect(() => {
    if (!selectedProgram?.name) return;
    try {
      const raw = localStorage.getItem(`Quran-tracker-${selectedProgram.name}`);
      setSaved(raw ? JSON.parse(raw) : {});
    } catch {
      setSaved({});
    }
    const onProgress = (e) => {
      if (e?.detail?.programName === selectedProgram?.name)
        setSaved(e.detail.data || {});
    };
    window.addEventListener("quran-progress-updated", onProgress);
    return () =>
      window.removeEventListener("quran-progress-updated", onProgress);
  }, [selectedProgram?.name]);

  const cells = useMemo(() => {
    const today = new Date();
    const days = [];
    for (let i = 119; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const key = new Date(
        d.getFullYear(),
        d.getMonth(),
        d.getDate()
      ).getTime();
      const completed = Object.values(saved || {}).some(
        (v) =>
          v?.completedAt && new Date(v.completedAt).setHours(0, 0, 0, 0) === key
      );
      days.push({ date: d, completed });
    }
    return days;
  }, [saved]);

  if (!selectedProgram?.name) return null;

  return (
    <section className="card" aria-label="التقويم">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(20, 12px)",
          gap: "4px",
          direction: "ltr",
        }}
      >
        {cells.map((c, idx) => (
          <div
            key={idx}
            title={c.date.toLocaleDateString("ar")}
            style={{
              width: 12,
              height: 12,
              borderRadius: 3,
              background: c.completed
                ? "rgba(34,197,94,0.9)"
                : "rgba(148,163,184,0.35)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
