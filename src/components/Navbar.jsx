import * as React from "react";
import { useState, useEffect } from "react";
import InstallPWAButton from "./InstallPWAButton.jsx";
import SyncIndicator from "./SyncIndicator.jsx";
import AuthMenu from "./AuthMenu.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

const pages = [
  { label: "الجدول التدريبي", href: "#Days" },
  { label: "المنهجية", href: "#Ways" },
];

export default function Navbar({ onOpenSettings }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle active section highlighting
  useEffect(() => {
    const sections = pages.map((page) => page.href.replace("#", ""));
    const handleScroll = () => {
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      setActiveSection(current || "");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`modern-navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Brand */}
        <a href="#top" className="brand">
          <div className="brand-logo">
            <img src="/logo.png" alt="وردي" />
          </div>
          <span className="brand-text">وردي</span>
        </a>

        {/* Desktop Navigation */}
        <div className="nav-links desktop-only">
          {pages.map((page) => (
            <a
              key={page.href}
              href={page.href}
              className={`nav-link ${
                activeSection === page.href.replace("#", "") ? "active" : ""
              }`}
            >
              {page.label}
            </a>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="nav-actions">
          <div className="action-group desktop-only">
            <SyncIndicator />
            <InstallPWAButton />
            <ThemeToggle />
          </div>

          <div className="user-menu">
            <button
              className="user-menu-trigger"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <img src="/logo.png" alt="القائمة" />
            </button>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <>
                <div
                  className="mobile-overlay"
                  onClick={() => setIsMobileMenuOpen(false)}
                />
                <div className="mobile-menu">
                  <div className="mobile-menu-header">
                    <span>القائمة</span>
                    <button
                      className="close-button"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      ✕
                    </button>
                  </div>

                  <div className="mobile-nav-links">
                    {pages.map((page) => (
                      <a
                        key={page.href}
                        href={page.href}
                        className="mobile-nav-link"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {page.label}
                      </a>
                    ))}
                  </div>

                  <div className="mobile-actions">
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onOpenSettings?.();
                      }}
                    >
                      الإعدادات
                    </button>
                    <div className="mobile-action-row">
                      <SyncIndicator />
                      <InstallPWAButton />
                      <ThemeToggle />
                    </div>
                    <div className="mobile-auth">
                      <AuthMenu />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Desktop User Menu */}
          <div className="desktop-user-menu desktop-only">
            <button className="btn btn-ghost btn-sm" onClick={onOpenSettings}>
              الإعدادات
            </button>
            <div className="auth-wrapper">
              <AuthMenu />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
// Duplicate legacy navbar removed. The MUI AppBar implementation above is the only export.
