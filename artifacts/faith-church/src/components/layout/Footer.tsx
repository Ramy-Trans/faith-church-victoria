import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { Facebook, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{t("كنيسة الإيمان", "Faith Church")}</h3>
            <p className="text-slate-300 mb-4">
              {t(
                "مكان للنمو في الإيمان والمجتمع. نرحب بك دائمًا.",
                "A place to grow in faith and community. You are always welcome."
              )}
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/faithchurchegy" target="_blank" rel="noreferrer" className="text-slate-300 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">{t("روابط سريعة", "Quick Links")}</h4>
            <ul className="space-y-2 text-slate-300">
              <li><Link href="/about" className="hover:text-white">{t("عن الكنيسة", "About Us")}</Link></li>
              <li><Link href="/first-visit" className="hover:text-white">{t("زيارتك الأولى", "First Visit")}</Link></li>
              <li><Link href="/sermons" className="hover:text-white">{t("العظات", "Sermons")}</Link></li>
              <li><Link href="/give" className="hover:text-white">{t("العطاء", "Give")}</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">{t("الخدمات", "Ministries")}</h4>
            <ul className="space-y-2 text-slate-300">
              <li><Link href="/kids" className="hover:text-white">{t("خدمة الأطفال", "Kids Ministry")}</Link></li>
              <li><Link href="/students" className="hover:text-white">{t("الشباب", "Students")}</Link></li>
              <li><Link href="/adults" className="hover:text-white">{t("البالغين", "Adults")}</Link></li>
              <li><Link href="/resources" className="hover:text-white">{t("الموارد", "Resources")}</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">{t("تواصل معنا", "Contact Us")}</h4>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 shrink-0 mt-0.5" />
                <span>{t("ميدان فيكتوريا، شبرا، القاهرة", "Victoria Square, Shubra, Cairo")}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 shrink-0" />
                <span dir="ltr">+20 2 XXXX XXXX</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 shrink-0" />
                <span>info@faithchurch.eg</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
          <p>&copy; 2025 {t("كنيسة الإيمان. جميع الحقوق محفوظة.", "Faith Church. All rights reserved.")}</p>
        </div>
      </div>
    </footer>
  );
}
