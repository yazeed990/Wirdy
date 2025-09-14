import { useState } from "react";
import StatsBar from "./StatsBar.jsx";
import Settings from "./Settings.jsx";
import Navbar from "./Navbar.jsx";
import HeroPreview from "./HeroPreview.jsx";

export default function Layout(props) {
  const { children } = props;
  const [settingsOpen, setSettingsOpen] = useState(false);

  const header = <Navbar onOpenSettings={() => setSettingsOpen(true)} />;

  const _preview = (
    <div
      style={{
        background: "repeating-linear-gradient(#1a1e32 0.3%, transparent)",
      }}
      className=" flex justify-between items-center  py-5 px-3 "
    >
      <div className="custom-framework text-md space-y-3 sm:text-lg sm:space-y-8 md:text-2xl">
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
        <a
          href="https://www.linkedin.com/in/yazeed-almalaq-783435350/"
          target="_blank"
        >
          يزيد الملق
        </a>
      </p>
    </footer>
  );

  return (
    <>
      {header}
      <HeroPreview />
      <StatsBar />
      {settingsOpen && (
        <Settings open={settingsOpen} onClose={() => setSettingsOpen(false)} />
      )}
      {children}
      {footer}
    </>
  );
}
