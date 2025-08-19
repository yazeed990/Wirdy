import { useEffect, useMemo, useState } from "react";
import { usePrograms } from "../zustand-1/Zustand-Programs.jsx";
import { memorizationPrograms } from "../utils/index.js";

function formatDate(date) {
  try {
    return new Intl.DateTimeFormat("ar", { dateStyle: "medium" }).format(date);
  } catch {
    return date.toLocaleDateString();
  }
}

export default function StatsBar() {
  const selectedProgram = usePrograms((s) => s.selectedProgram);
  const [saved, setSaved] = useState({});

  const totalDays = useMemo(() => {
    if (!selectedProgram?.name) return 0;
    const meta = memorizationPrograms.find(
      (p) => p.name === selectedProgram.name
    );
    return meta?.averageDays || 30;
  }, [selectedProgram?.name]);

  const completedDays = useMemo(() => {
    return Object.values(saved || {}).filter((d) => d?.isComplete).length;
  }, [saved]);

  const percent = totalDays
    ? Math.min(100, Math.round((completedDays / totalDays) * 100))
    : 0;

  const { etaDate, dailyPace } = useMemo(() => {
    const timestamps = Object.values(saved || {})
      .map((d) => d?.completedAt)
      .filter(Boolean)
      .sort();
    if (timestamps.length === 0) return { etaDate: null, dailyPace: 0 };
    const first = timestamps[0];
    const daysElapsed = Math.max(
      1,
      Math.ceil((Date.now() - first) / (1000 * 60 * 60 * 24))
    );
    const pacePerDay = completedDays / daysElapsed; // days/day
    if (pacePerDay <= 0) return { etaDate: null, dailyPace: 0 };
    const remaining = Math.max(0, totalDays - completedDays);
    const etaDays = Math.ceil(remaining / pacePerDay);
    const eta = new Date(Date.now() + etaDays * 24 * 60 * 60 * 1000);
    return { etaDate: eta, dailyPace: pacePerDay };
  }, [saved, completedDays, totalDays]);

  useEffect(() => {
    if (!selectedProgram?.name) return;
    try {
      const raw = localStorage.getItem(`Quran-tracker-${selectedProgram.name}`);
      setSaved(raw ? JSON.parse(raw) : {});
    } catch {
      setSaved({});
    }

    const onProgress = (e) => {
      if (e?.detail?.programName === selectedProgram?.name) {
        setSaved(e.detail.data || {});
      }
    };
    window.addEventListener("quran-progress-updated", onProgress);
    return () =>
      window.removeEventListener("quran-progress-updated", onProgress);
  }, [selectedProgram?.name]);

  if (!selectedProgram?.name) return null;

  return (
    <section
      className="card card-elevated animate-fade-in"
      aria-label="لوحة التقدم"
    >
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-semibold text-primary">
              تقدمك في حفظ القرآن
            </h3>
          </div>
          <span className="badge badge-info text-sm">
            {selectedProgram?.name}
          </span>
        </div>

        {/* Main Progress */}
        <div className="space-y-4">
          <div className="flex items-end justify-between">
            <div className="text-center">
              <div className="stat-value text-accent">{completedDays}</div>
              <div className="stat-label">يوم مكتمل</div>
            </div>
            <div className="text-center opacity-60">
              <div className="text-2xl font-bold text-muted">من</div>
            </div>
            <div className="text-center">
              <div className="stat-value text-secondary">{totalDays}</div>
              <div className="stat-label">إجمالي الأيام</div>
            </div>
          </div>

          {/* Enhanced Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-secondary">التقدم</span>
              <span className="text-lg font-bold text-accent">{percent}%</span>
            </div>
            <div className="progress-container">
              <div
                className="progress-bar"
                style={{ width: `${percent}%` }}
                role="progressbar"
                aria-valuenow={percent}
                aria-valuemin={0}
                aria-valuemax={100}
              ></div>
            </div>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-value text-lg">
              {dailyPace ? dailyPace.toFixed(1) : "0"}
            </div>
            <div className="stat-label">معدل يومي</div>
          </div>
          <div className="stat-item">
            <div className="stat-value text-lg">
              {etaDate ? formatDate(etaDate) : "—"}
            </div>
            <div className="stat-label">التوقع للإتمام</div>
          </div>
        </div>

        {/* Achievement Indicator */}
        {percent > 0 && (
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm font-medium text-success">
              {percent >= 100
                ? "مبارك! لقد أتممت البرنامج"
                : percent >= 75
                ? "ممتاز! أنت قريب جداً من الإتمام"
                : percent >= 50
                ? "رائع! نصف الطريق تم بنجاح"
                : percent >= 25
                ? "استمر! بداية موفقة"
                : "خطواتك الأولى في رحلة الحفظ"}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
