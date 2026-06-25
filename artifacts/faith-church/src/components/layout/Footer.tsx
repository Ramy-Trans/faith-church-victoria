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
    href: "https://on.soundcloud.com/dtZdPIDfcQD84hUaqj",
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
                <a
                  href="https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.bing.com%2Fmaps%2Fdefault.aspx%3Fv%3D2%26pc%3DFACEBK%26mid%3D8100%26where1%3D%25D9%25A5%2520%25D8%25B4%2520%25D8%25B9%25D8%25A8%25D8%25AF%2520%25D8%25A7%25D9%2584%25D9%2588%25D9%2587%25D8%25A7%25D8%25A8%2520%25D8%25B2%25D9%258A%25D8%25AF%25D8%25A7%25D9%2586-%2520%25D9%2585%25D9%258A%25D8%25AF%25D8%25A7%25D9%2586%2520%25D9%2581%25D9%258A%25D9%2583%25D8%25AA%25D9%2588%25D8%25B1%25D9%258A%25D8%25A7%25D8%258C%2520%25D8%25A7%25D9%2584%25D8%25AA%25D8%25B1%25D8%25B9%25D8%25A9%2520%25D8%25A7%25D9%2584%25D8%25A8%25D9%2588%25D9%2584%25D8%25A7%25D9%2582%25D9%258A%25D8%25A9%2520-%2520%25D8%25B4%25D8%25A8%25D8%25B1%25D8%25A7%2520%25D9%2585%25D8%25B5%25D8%25B1%252C%2520Cairo%252C%2520Egypt%252C%252011241%26FORM%3DFBKPL1%26mkt%3Den-US%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExOWVEa2JnVnlPaXBvSDlocnNydGMGYXBwX2lkEDIyMjAzOTE3ODgyMDA4OTIAAR5qK7UX8j2YCHFQ8ziX0YVoKhUqnYtX3t4KhjJd2Q4I4DsAGWaztTYokprxBg_aem_dgOTZNIO10pSMNRp5LUDzA&h=AUCOREF-dD25wPxqC1Uf-29d7RA1tYFwZonROV4MLkYz3SXOqjCrR85Jpbo6XLNr9lNJbwA57_7J_Dkubxbvut6RQ_EDgI0zytloLZBziCqKN7jc2n5f-ir7jFz02KEu7bpg"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors leading-relaxed"
                >
                  {t("ش عبد الوهاب زيدان- ميدان فيكتوريا، الترعة البولاقية - شبرا مصر، القاهرة، مصر ١١٢٤١", "Abd El-Wahab Zeidan St, Victoria Sq, Boulakia Canal, Shubra Misr, Cairo, Egypt 11241")}
                </a>
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
