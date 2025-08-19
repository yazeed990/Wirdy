import { useMemo } from "react";
import { usePrograms } from "../zustand-1/Zustand-Programs.jsx";

export default function QuickActions({ onOpenToday }) {
  const selectedProgram = usePrograms((s) => s.selectedProgram);

  const key = useMemo(
    () =>
      selectedProgram?.name ? `Quran-tracker-${selectedProgram.name}` : null,
    [selectedProgram?.name]
  );

  const { lastDay, nextDay } = useMemo(() => {
    if (!key) return { lastDay: null, nextDay: 1 };
    try {
      const saved = JSON.parse(localStorage.getItem(key) || "{}");
      const done = Object.keys(saved)
        .filter((k) => saved[k]?.isComplete)
        .map((k) => parseInt(k, 10))
        .sort((a, b) => a - b);
      const last = done.length ? done[done.length - 1] : null;
      return { lastDay: last, nextDay: (last ?? -1) + 1 };
    } catch {
      return { lastDay: null, nextDay: 1 };
    }
  }, [key]);

  if (!selectedProgram?.name) return null;

  return (
    <section className="card animate-fade-in" aria-label="إجراءات سريعة">
      <div className="flex flex-col gap-4">
        <div className="flex items-center">
          <h3 className="text-lg font-semibold text-primary">
            ابدأ الحفظ اليوم
          </h3>
        </div>

        <div className="flex gap-3 flex-wrap">
          <button
            className="btn btn-primary btn-lg"
            onClick={() => onOpenToday(nextDay)}
          >
            ابدأ اليوم {nextDay + 1}
          </button>

          {lastDay !== null && (
            <button
              className="btn btn-secondary"
              onClick={() => onOpenToday(lastDay)}
            >
              مراجعة اليوم {lastDay + 1}
            </button>
          )}
        </div>

        <div className="text-sm text-secondary bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
          <strong>نصيحة:</strong> الثبات على الحفظ اليومي أهم من الكمية
        </div>
      </div>
    </section>
  );
}
