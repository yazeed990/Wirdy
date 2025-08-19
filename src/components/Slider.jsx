import {
  fiftyMethod,
  mauritanianMethod,
  qasimMethod,
  tallaqqiMethod,
  threeByThreeMethod,
  goldenFajrMethod,
  kitabahMethod,
  fiveShields,
} from "../utils/index";

import { Carousel } from "primereact/carousel";
import { usePrograms } from "../zustand-1/Zustand-Programs.jsx";

export default function ProgramSlider() {
  const selectedProgram = usePrograms((state) => state.selectedProgram);
  const changeProgram = usePrograms((state) => state.changeProgram);

  const responsiveOptions = [
    {
      breakpoint: "1199px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "991px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const programs = [
    {
      title: "الطريقة الخمسينية",
      description:
        "طريقة الشيخ الشنقيطي: 10 مرات بعد كل صلاة للوصول لـ50 مرة يومياً مع المراجعة المنتظمة.",
      data: fiftyMethod,
    },
    {
      title: "الطريقة الموريتانية التقليدية",
      description:
        "أسلوب صحراوي عريق يعتمد على النسخ اليدوي والتكرار المكثف مع التدبر الروحي.",
      data: mauritanianMethod,
    },
    {
      title: "طريقة الإمام القاسم",
      description:
        "منهج إمام الحرم النبوي: حفظ تدريجي آية بآية مع ربط وإتقان ومراجعة دورية.",
      data: qasimMethod,
    },
    {
      title: "طريقة التلقي والسماع",
      description:
        "الأسلوب الأصيل منذ عهد الصحابة: تلقي مباشر من الشيخ مع تصحيح فوري وتطبيق.",
      data: tallaqqiMethod,
    },
    {
      title: "طريقة 3×3 المعتمدة",
      description:
        "أسلوب حديث منظم: تجميع 3 آيات، تثبيت، مراجعة، وتدبر لوحدات قابلة للإدارة.",
      data: threeByThreeMethod,
    },
    {
      title: "طريقة الفجر الذهبي",
      description:
        "استغلال الساعة المباركة بعد الفجر مع برنامج صباحي ونهاري وليلي وروحي متكامل.",
      data: goldenFajrMethod,
    },
    {
      title: "طريقة الكتابة والإملاء",
      description:
        "حفظ متعدد الحواس: كتابة، مقارنة، تكرار، ومراجعة لتقوية الذاكرة البصرية والحركية.",
      data: kitabahMethod,
    },
    {
      title: "الحصون الخمسة",
      description:
        "نظام الحماية الخماسية: دروع الحفظ والمراجعة والتلاوة والتحضير للحفظ الراسخ.",
      data: fiveShields,
    },
  ];

  const productTemplate = (program, index) => {
    const content = Object.entries(program.data).map(([key, value]) => {
      return { desc: key, meta: value };
    });

    const getCardStyle = (indexx) => {
      const gradients = [
        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", // prog-1
        "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", // prog-2
        "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", // prog-3
        "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)", // prog-4
        "linear-gradient(135deg, #fa709a 0%, #fee140 100%)", // prog-5
        "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)", // prog-6
        "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)", // prog-7
        "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)", // prog-8
      ];

      return {
        background: gradients[indexx % gradients.length],
        color: [5, 6].includes(indexx) ? "#333" : "white",
        direction: "rtl",
      };
    };
    const current = !!(
      program.data &&
      selectedProgram &&
      program.data.name === selectedProgram.name
    );

    return (
      <div className="arabic-program-card" style={getCardStyle(index)}>
        <div className="program-card-header">
          <h3 className="arabic-program-title">{program.title}</h3>
          {current && <div className="selected-badge">✓ محدد</div>}
        </div>

        <p className="arabic-program-description">{program.description}</p>

        <div className="arabic-program-stats">
          <div className="stat-item">
            <span className="stat-label">
              {content[1].desc.split("_").join(" ")}
            </span>
            <span className="stat-value">{content[1].meta.length} تمارين</span>
          </div>

          <div className="stat-divider"></div>

          <div className="stat-item">
            <span className="stat-label">
              {content[2].desc.split("_").join(" ")}
            </span>
            <span className="stat-value">{content[2].meta.length} تمارين</span>
          </div>
        </div>

        <div className="arabic-program-preview">
          <div className="preview-item">
            <span className="preview-label">نموذج الحفظ:</span>
            <span className="preview-text">{content[1].meta[0].name}</span>
          </div>
          <div className="preview-item">
            <span className="preview-label">نموذج المراجعة:</span>
            <span className="preview-text">{content[2].meta[0].name}</span>
          </div>
        </div>

        <div className="program-card-footer">
          {current ? (
            <button className="arabic-btn selected" disabled>
              البرنامج المحدد
            </button>
          ) : (
            <button
              className="arabic-btn primary"
              onClick={() => changeProgram(program.data)}
            >
              اختيار هذا البرنامج
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="arabic-slider-section" dir="rtl">
      <div className="slider-container">
        <div className="slider-header">
          <h2 className="slider-title">اختر طريقة الحفظ المناسبة</h2>
          <p className="slider-subtitle">
            طرق مجربة ومعتمدة من علماء القرآن والحفاظ
          </p>
        </div>

        <Carousel
          value={programs}
          numVisible={4}
          numScroll={1}
          responsiveOptions={responsiveOptions}
          className="arabic-carousel"
          autoplayInterval={6000}
          itemTemplate={productTemplate}
          circular={true}
          showIndicators={true}
          showNavigators={true}
          orientation="horizontal"
          pt={{
            root: { style: { direction: "rtl" } },
            content: { style: { direction: "rtl" } },
            container: { style: { direction: "rtl" } },
          }}
        />
      </div>
    </section>
  );
}
