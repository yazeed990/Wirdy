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
      breakpoint: "1400px",
      numVisible: 3,
      numScroll: 2,
    },
    {
      breakpoint: "1199px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
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
    // ✅ نفس طريقتك القديمة
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
    const current = program.data == selectedProgram;

    return (
      <div
        className={`surface-border border-round m-2 text-center py-8  px-2 bg-linear-120 bg-sky-${
          current ? "600" : "900"
        } rounded-4xl`}
        style={getCardStyle(index)}
      >
        <h3 className="program-title text-center mx-auto ">{program.title}</h3>

        <p className="program-description">{program.description}</p>

        <div className="program-summary">
          <div className="summary-item memorise-summary">
            <span className="summary-icon">📖</span>
            <span className="summary-text">
              ورد {content[1].desc.split("_").join(" ")}
            </span>
            <span className="summary-count">
              {content[1].meta.length} تمارين
            </span>
          </div>

          <div className="summary-item recite-summary">
            <span className="summary-icon">📘</span>
            <span className="summary-text">
              ورد {content[2].desc.split("_").join(" ")}
            </span>
            <span className="summary-count">
              {content[2].meta.length} تمارين
            </span>
          </div>
        </div>

        <div className="program-preview flex flex-col justify-center items-center text-center gap-2">
          <div className="preview-exercise">
            <strong>مثال من {content[1].desc.split("_").join(" ")}:</strong>{" "}
            {content[1].meta[0].name}
          </div>
          <div className="preview-exercise">
            <strong>مثال من {content[2].desc.split("_").join(" ")}:</strong>{" "}
            {content[2].meta[0].name}
          </div>
        </div>

        {current ? (
          <button
            className="bg-blue-300 text-white px-4 py-1 rounded-2xl hover:bg-blue-900 hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 hover:-translate-y-0.5 active:scale-90 transition-transform duration-75 font-medium cursor-pointer"
            onClick={() => changeProgram(program.data)}
          >أخترت هذا البرنامج</button>
        ) : (
          <button
            className="bg-blue-950 text-white px-4 py-1 rounded-2xl hover:bg-blue-900 hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 hover:-translate-y-0.5 active:scale-90 transition-transform duration-75 font-medium cursor-pointer"
            onClick={() => changeProgram(program.data)}
          >
            اضغط للاختيار
          </button>
        )}
      </div>
    );
  };

  return (
    <>
      <div style={{ direction: "ltr" }}>
        <Carousel
          value={programs}
          numVisible={3}
          numScroll={3}
          responsiveOptions={responsiveOptions}
          className="custom-carousel overflow-x-hidden"
          custom-framework
          autoplayInterval={3000}
          itemTemplate={productTemplate}
          rtl
        />
      </div>
    </>
  );
}
