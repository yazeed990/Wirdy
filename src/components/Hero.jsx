export default function Hero() {
  return (
    <>
      <section className="custom-framework how-to hero px-6 py-12  text-right">
        <div className="custom-framework even-columns gap-12 items-center">
          {/* Content Side */}
          <div className="custom-framework space-y-6 max-w-xl">
            <h2
              id="WhereToStart"
              className="custom-framework text-3xl font-bold text-800"
            >
              كيف أبدأ؟
            </h2>
            <ul className="custom-framework benefits-list list-disc pr-6 text-700 space-y-3">
              <li>
                خطوات يسيرة، تعرف كم يوم بقي لك، لتعان بحول الله وقوته على إنجاز
                حفظك لكتاب الله
              </li>
              <li>كن من أهل القرآن، الذين هم أهل الله وخاصته</li>
              <li>
                قال رسول الله صلى الله عليه وسلم: (تركت فيكم أمرين لن تضلوا ما
                تمسكتم بهما: كتاب الله وسنة نبيه)
              </li>
              <li>حاسب نفسك قبل أن تُحاسب</li>
              <li>
                كن ممن يُقال لهم: اقرأ وارتق ورتل، كما كنت ترتل في الدنيا، فإن
                منزلك عند آخر آية تقرؤها 🤍
              </li>
            </ul>
          </div>

          {/* Image Side */}
          <div>
            <img
              src="/roadmap.png"
              alt="Roadmap"
              className="custom-framework rounded-xl shadow-md w-full max-w-md"
            />
          </div>
        </div>

        {/* Five Shields Section */}
      </section>
    </>
  );
}
