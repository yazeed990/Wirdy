export default function Layout(props) {
  const { children } = props;

  const header = (
    <header>
      <div className="custom-framework nav-bar">
        <a className="custom-framework home text-gradient" href="">
          <img className="custom-framework logo-nav" src="/logo.png" />
          وردي
        </a>
        <a href="#WhereToStart">كيف أبدأ؟</a>
        <a href="#Days">جدول الحفظ</a>
        <a href="#Ways">منهجيه</a>
      </div>
    </header>
  );

  const preview = (
    <div className="custom-framework even-columns ">
      <div className="custom-framework text flex flex-col gap-10">
        <p>
          <strong>خلصت وردك؟</strong>
        </p>
        <p>
          تسمع عن "أحفظ القران في سنتين، صفحة كل يوم"؟ في أربع..أو حتى في عشر
          سنين...
        </p>
        <p>تسجليك لوردك هنا، بيكون أول خطوة.. "يوم1: تم!"</p>
        <p>
          {" "}
          وخطوة وحده راحت همه، كل يوم في رحلتك الطويلة في حفظ القران بتكون
          محسوبة وكل يوم تتركه بيتسجل انك فوته، ولازم تعوضه..خطة واضحة، هدف جليل
          وغايتنا رضى رب العالمين
        </p>
      </div>
      <div className="custom-framework ">
        <img src="/Pngtree.png" alt="" />
      </div>
    </div>
  );

  const footer = (
    <footer>
      <p>
        صمم بواسطة{" "}
        <a href="/" target="_blank">
          يزيد الملق
        </a>
      </p>
    </footer>
  );

  return (
    <>
      {header}
      {preview}
      {children}
      {footer}
    </>
  );
}
