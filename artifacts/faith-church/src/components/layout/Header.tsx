import { Link, useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "/logo.png";

const primaryLinks = [
  { href: "/", labelAr: "الرئيسية", labelEn: "Home" },
  { href: "/about", labelAr: "عن الكنيسة", labelEn: "About" },
  { href: "/sermons", labelAr: "العظات", labelEn: "Sermons" },
  { href: "/events", labelAr: "الفعاليات", labelEn: "Events" },
];

const moreLinks = [
  { href: "/first-visit", labelAr: "زيارتك الأولى", labelEn: "First Visit" },
  { href: "/next-steps", labelAr: "الخطوات القادمة", labelEn: "Next Steps" },
  { href: "/kids", labelAr: "الأطفال", labelEn: "Kids" },
  { href: "/students", labelAr: "الشباب", labelEn: "Students" },
  { href: "/adults", labelAr: "البالغين", labelEn: "Adults" },
  { href: "/resources", labelAr: "الموارد", labelEn: "Resources" },
  { href: "/give", labelAr: "العطاء", labelEn: "Give" },
  { href: "/contact", labelAr: "تواصل معنا", labelEn: "Contact" },
];

export function Header() {
  const { t, language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setMoreOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === "ar" ? "en" : "ar");
  };

  const isMoreActive = moreLinks.some(l => l.href === location);

  return (
    <motion.header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/98 backdrop-blur-md shadow-md border-b border-border/50"
          : "bg-white/95 backdrop-blur border-b border-border"
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 flex h-20 items-center justify-between gap-4">
        {/* Logo — large, prominent */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <motion.img
            src={logoImg}
            alt="Faith Church Logo"
            className="h-16 w-auto object-contain drop-shadow-sm"
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
          {primaryLinks.map((link, i) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={t(link.labelAr, link.labelEn)}
              isActive={location === link.href}
              delay={i * 0.04}
            />
          ))}

          {/* More dropdown */}
          <div ref={moreRef} className="relative">
            <motion.button
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: primaryLinks.length * 0.04, duration: 0.3 }}
              onClick={() => setMoreOpen(v => !v)}
              className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isMoreActive || moreOpen
                  ? "text-primary bg-primary/10"
                  : "text-foreground hover:text-primary hover:bg-primary/5"
              }`}
            >
              {t("اكتشف", "Explore")}
              <motion.span
                animate={{ rotate: moreOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="h-3.5 w-3.5" />
              </motion.span>
            </motion.button>

            <AnimatePresence>
              {moreOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute top-full mt-1 start-0 min-w-44 bg-white rounded-xl shadow-xl border border-border/60 overflow-hidden z-50"
                >
                  {moreLinks.map(link => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block px-4 py-2.5 text-sm font-medium transition-colors ${
                        location === link.href
                          ? "text-primary bg-primary/10"
                          : "text-foreground hover:text-primary hover:bg-primary/5"
                      }`}
                    >
                      {t(link.labelAr, link.labelEn)}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center gap-2 border-primary/30 text-primary hover:bg-primary hover:text-white transition-all"
              data-testid="button-language-toggle"
            >
              <Globe className="h-4 w-4" />
              <span>{language === "ar" ? "EN" : "عربي"}</span>
            </Button>
          </motion.div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLanguage}
            data-testid="button-language-toggle-mobile"
          >
            <Globe className="h-5 w-5 text-primary" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            data-testid="button-mobile-menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden border-t bg-white overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {[...primaryLinks, ...moreLinks].map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ x: language === "ar" ? 20 : -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.04, duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    className={`block py-2.5 px-3 text-base font-medium rounded-lg transition-colors ${
                      location === link.href
                        ? "text-primary bg-primary/10"
                        : "text-foreground hover:text-primary hover:bg-primary/5"
                    }`}
                  >
                    {t(link.labelAr, link.labelEn)}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ x: language === "ar" ? 20 : -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: ([...primaryLinks, ...moreLinks].length) * 0.04 }}
                className="flex gap-3 pt-2 mt-2 border-t"
              >
                <Link
                  href="/give"
                  className="flex-1 py-2.5 px-3 text-base font-bold text-accent text-center rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors"
                >
                  {t("العطاء", "Give")}
                </Link>
                <Link
                  href="/contact"
                  className="flex-1 py-2.5 px-3 text-base font-medium text-foreground text-center rounded-lg hover:bg-muted transition-colors"
                >
                  {t("تواصل معنا", "Contact")}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function NavLink({ href, label, isActive, delay }: { href: string; label: string; isActive: boolean; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
    >
      <Link
        href={href}
        className={`relative px-3 py-2 text-sm font-medium rounded-md transition-colors ${
          isActive ? "text-primary bg-primary/10" : "text-foreground hover:text-primary hover:bg-primary/5"
        }`}
      >
        {label}
        {isActive && (
          <motion.div
            layoutId="active-nav"
            className="absolute -bottom-[1px] left-3 right-3 h-0.5 bg-primary rounded-full"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </Link>
    </motion.div>
  );
}
