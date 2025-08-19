import { useState } from "react";
import ProgramSlider from "./Slider";
import CalendarHeatmap from "./CalendarHeatmap.jsx";
import ActivityFeed from "./ActivityFeed.jsx";
import StatsBar from "./StatsBar.jsx";

export default function ProgramSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="program-section">
      <StatsBar />
      <div className="program-collapsible">
        <div className="workout-buttons">
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? "إخفاء التفاصيل" : "عرض المزيد"}
          </button>
        </div>
        {expanded && (
          <div className="program-details">
            <CalendarHeatmap />
            <ActivityFeed />
          </div>
        )}
      </div>
      <ProgramSlider />
    </section>
  );
}
