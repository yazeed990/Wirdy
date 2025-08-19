export default function HeroPreview() {
  return (
    <section className="hero-preview">
      <div className="hero-preview-inner">
        <div className="hero-text">
          <p>
            <strong>خلصت وردك؟</strong>
          </p>
          <p>
            تسمع عن "أحفظ القران في سنتين، صفحة كل يوم"؟ في أربع..أو حتى في عشر
            سنين...
          </p>
          <p>تسجليك لوردك هنا، بيكون أول خطوة.. "يوم1: تم!"</p>
          <p>
            وخطوة وحده راحت همه، كل يوم في رحلتك الطويلة في حفظ القران بتكون
            محسوبة وكل يوم تتركه بيتسجل انك فوته، ولازم تعوضه..خطة واضحة، هدف
            جليل وغايتنا رضى رب العالمين
          </p>
          <div className="flex gap-3 flex-wrap mt-4">
            <a href="#Days" className="btn btn-primary">
              ابدأ اليوم
            </a>
            <a href="#Ways" className="btn btn-secondary">
              تعرف على المنهجية
            </a>
          </div>
        </div>
        <div className="hero-image">
          <img src="/Pngtree.png" alt="مقدمة - وردي" />
        </div>
      </div>
    </section>
  );
}
