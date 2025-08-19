import { useEffect } from "react";

export default function HeroMini() {
  useEffect(() => {
    // no-op for now
  }, []);

  return (
    <section className="hero-mini" aria-label="مقدمة">
      <div className="hero-mini-inner">
        <h1>وردي — تتبع حفظك ببساطة</h1>
        <p>
          اختَر برنامجك، ابدأ يومك، وابقَ على المسار بالذكاء والتنبيهات
          والتقويم.
        </p>
        <div className="workout-buttons">
          <a className="card-button-primary" href="#Days">
            ابدأ اليوم
          </a>
          <a className="card-button" href="#Ways">
            تعرف على المنهجية
          </a>
        </div>
      </div>
    </section>
  );
}
