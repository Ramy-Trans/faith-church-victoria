import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube, FaSoundcloud, FaTiktok } from "react-icons/fa6";

const socialLinks = [
  {
    icon: <FaFacebook className="h-5 w-5" />,
    href: "https://www.facebook.com/share/1H5Srg4kD1/?mibextid=wwXIfr",
    label: "Facebook",
    hoverColor: "hover:text-blue-500",
  },
  {
    icon: <FaInstagram className="h-5 w-5" />,
    href: "https://www.instagram.com/faithchegypt?igsh=NG1weGJicDlkenE%3D&utm_source=qr",
    label: "Instagram",
    hoverColor: "hover:text-pink-500",
  },
  {
    icon: <FaYoutube className="h-5 w-5" />,
    href: "https://youtube.com/@faithchegypt?si=DP0XUXApsRxuVQ3C",
    label: "YouTube",
    hoverColor: "hover:text-red-500",
  },
  {
    icon: <FaSoundcloud className="h-5 w-5" />,
    href: "https://on.soundcloud.com/zzygskMC",
    label: "SoundCloud",
    hoverColor: "hover:text-orange-400",
  },
  {
    icon: <FaTiktok className="h-5 w-5" />,
    href: "https://vt.tiktok.com/ZSC2g7PXX/",
    label: "TikTok",
    hoverColor: "hover:text-white",
  },
];

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{t("كنيسة الإيمان", "Faith Church")}</h3>
            <p className="text-slate-300 mb-5 leading-relaxed">
              {t(
                "عبادة الرب وخدمة شعبه في مصر.",
                "Worshipping the Lord and serving His people in Egypt."
              )}
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                  className={`text-slate-400 transition-colors duration-200 ${link.hoverColor}`}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">{t("روابط سريعة", "Quick Links")}</h4>
            <ul className="space-y-2 text-slate-300">
              <li><Link href="/about" className="hover:text-white transition-colors">{t("عن الكنيسة", "About Us")}</Link></li>
              <li><Link href="/first-visit" className="hover:text-white transition-colors">{t("زيارتك الأولى", "First Visit")}</Link></li>
              <li><Link href="/sermons" className="hover:text-white transition-colors">{t("العظات", "Sermons")}</Link></li>
              <li><Link href="/give" className="hover:text-white transition-colors">{t("العطاء", "Give")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">{t("الخدمات", "Ministries")}</h4>
            <ul className="space-y-2 text-slate-300">
              <li><Link href="/kids" className="hover:text-white transition-colors">{t("خدمة الطفل", "Children's Ministry")}</Link></li>
              <li><Link href="/students" className="hover:text-white transition-colors">{t("خدمة ناشئ", "Youth Ministry")}</Link></li>
              <li><Link href="/students" className="hover:text-white transition-colors">{t("خدمة الشباب", "Students Ministry")}</Link></li>
              <li><Link href="/adults" className="hover:text-white transition-colors">{t("خدمة المتزوجين", "Married Couples")}</Link></li>
              <li><Link href="/adults" className="hover:text-white transition-colors">{t("خدمة السيدات", "Women's Ministry")}</Link></li>
              <li><Link href="/adults" className="hover:text-white transition-colors">{t("خدمة الرجال", "Men's Ministry")}</Link></li>
              <li><Link href="/resources" className="hover:text-white transition-colors">{t("خدمة الميديا", "Media Ministry")}</Link></li>
              <li><Link href="/next-steps" className="hover:text-white transition-colors">{t("خدمة الكرازة", "Evangelism")}</Link></li>
              <li><Link href="/resources" className="hover:text-white transition-colors">{t("خدمة جبل الصلاة", "Prayer Mountain")}</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">{t("خدمة احتياجات القديسين", "Saints' Needs")}</Link></li>
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
                <span dir="ltr">+20 122 602 7736</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 shrink-0" />
                <span>info@faithch.org</span>
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
