export default function Hero(){
    return(
        <>
            <section className="hero px-6 py-12  text-right">
      <div className="even-columns gap-12 items-center">
        {/* Content Side */}
        <div className="space-y-6 max-w-xl">
          <h2 className="text-3xl font-bold text-800">كيف أبدأ؟</h2>
          <ul className="benefits-list list-disc pr-6 text-700 space-y-3">
            <li>خطوات يسيرة، تعرف كم يوم بقي لك، لتعان بحول الله وقوته على إنجاز حفظك لكتاب الله</li>
            <li>كن من أهل القرآن، الذين هم أهل الله وخاصته</li>
            <li>
              قال رسول الله صلى الله عليه وسلم: (تركت فيكم أمرين لن تضلوا ما تمسكتم بهما: كتاب الله وسنة نبيه)
            </li>
            <li>حاسب نفسك قبل أن تُحاسب</li>
            <li>
              كن ممن يُقال لهم: اقرأ وارتق ورتل، كما كنت ترتل في الدنيا، فإن منزلك عند آخر آية تقرؤها 🤍
            </li>
          </ul>
        </div>

        {/* Image Side */}
        <div>
          <img src="/roadmap.png" alt="Roadmap" className="rounded-xl shadow-md w-full max-w-md" />
        </div>
      </div>

      {/* Five Shields Section */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold text-800 mb-4">
          <i>الحصون الخمس</i>
        </h3>
        <p className="text-600 mb-6">
          برنامج فعال لحفظ كتاب الله صالح لكل الناس ولجميع الأعمار، للدكتور (د. سعيد أبو العلا حمزة):
        </p>

        <ul className="space-y-10">
          <li>
            <h4 className="text-lg font-semibold text-green-700">📖 ورد التلاوة</h4>
            <ul className="list-disc pr-6 text-700 space-y-2">
              <li>تلاوة جزئين (20 صفحة)</li>
              <li>استماع لحزب (10 صفحات)</li>
            </ul>
          </li>

          <li>
            <h4 className="text-lg font-semibold text-green-700">📘 ورد الحفظ</h4>
            <ul className="list-disc pr-6 text-700 space-y-2">
              <li>تلاوة 7 صفحات من حفظ الأسبوع المقبل</li>
              <li>
                <i>ورد قبل النوم:</i> استمع لمدة 15 دقيقة للصفحة التي ستحفظها في اليوم التالي، ثم تلوها لنفس المدة
              </li>
            </ul>
          </li>

          <li>
            <h4 className="text-lg font-semibold text-green-700">🧠 المباشرة في الحفظ</h4>
            <ul className="list-disc pr-6 text-700 space-y-2">
              <li>تلاوة الصفحة بتركيز شديد لمدة 15 دقيقة</li>
              <li>ثم حفظها بنفس المدة بسهولة ويسر</li>
            </ul>
          </li>

          <li>
            <h4 className="text-lg font-semibold text-green-700">🔁 مراجعة القريب</h4>
            <p className="text-700">مراجعة آخر 20 صفحة حفظتها غيبًا</p>
          </li>

          <li>
            <h4 className="text-lg font-semibold text-green-700">📚 مراجعة البعيد</h4>
            <p className="text-700">
              مراجعة باقي المحفوظ على مدار أسبوع أو أسبوعين حسب وقتك
            </p>
          </li>
        </ul>
      </div>
    </section>
 
 
 
 
 
 
        </>
    )
}