import { memorizationPrograms, programDescriptions } from "../utils/index.js";

export default function Methodology() {
  return (
    <section id="Ways" className="program-section">
      <h2>المنهجيات المتاحة</h2>
      <div className="methods-grid">
        {memorizationPrograms.map((p) => (
          <details key={p.name} className="card">
            <summary className="method-summary">
              <span className="method-title">{p.displayName}</span>
              <span className="badge">الصعوبة: {p.difficulty}</span>
            </summary>
            <div className="method-body">
              <p>{programDescriptions[p.name]}</p>
              <ul className="method-meta">
                <li>الحد الأدنى: {p.minDays} يوم</li>
                <li>المتوسط: {p.averageDays} يوم</li>
                <li>الأقصى: {p.maxDays} يوم</li>
              </ul>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
