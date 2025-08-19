import { useEffect, useMemo, useState } from "react";
import { usePrograms } from "../zustand-1/Zustand-Programs.jsx";

export default function ActivityFeed() {
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

  const items = useMemo(() => {
    return Object.entries(saved || {})
      .filter(([, v]) => v?.completedAt)
      .map(([idx, v]) => ({ idx: Number(idx), at: v.completedAt }))
      .sort((a, b) => b.at - a.at)
      .slice(0, 6);
  }, [saved]);

  if (!selectedProgram?.name || items.length === 0) return null;

  return (
    <section className="card" aria-label="النشاط الأخير">
      <ul style={{ display: "grid", gap: "8px" }}>
        {items.map((it) => (
          <li
            key={it.idx}
            className="activity-item"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <span>أنجزت اليوم {it.idx + 1}</span>
            <time>{new Date(it.at).toLocaleString("ar")}</time>
          </li>
        ))}
      </ul>
    </section>
  );
}
