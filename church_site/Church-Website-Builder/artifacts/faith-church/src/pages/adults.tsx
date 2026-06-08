import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Heart, Home as HomeIcon, Shield, Phone } from "lucide-react";
import adultsImg from "@assets/image_1775740698464.png";

export default function Adults() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen pt-16">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-secondary/90 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${adultsImg})` }}
        />
        <div className="container relative z-20 px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold">
              {t("خدمة البالغين", "Adults Ministry")}
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              {t(
                "ننمو معاً في كل شيء",
                "Growing together in all things"
              )}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container px-4 max-w-5xl mx-auto space-y-20">
          
          {/* Men's Ministry */}
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4 flex justify-center">
              <div className="w-32 h-32 md:w-48 md:h-48 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                <Shield className="w-16 h-16 md:w-24 md:h-24" />
              </div>
            </div>
            <div className="md:col-span-8 space-y-4">
              <h2 className="text-3xl font-bold text-slate-900">{t("خدمة الرجال", "Men's Ministry")}</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                {t(
                  "رؤيتنا هي رجل ينمو في معرفة الله، متزن وناجح في كل جوانب حياته، مؤثر في عائلته، وفعال في كنيسته ومجتمعه.",
                  "Our vision is a man growing in the knowledge of God, balanced and successful in all aspects of life, influential in his family, and effective in his church and community."
                )}
              </p>
              <div className="bg-slate-50 p-4 rounded-lg mt-4 flex items-start gap-4 border">
                <Heart className="w-6 h-6 text-accent shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">{t("الخدمة الطبية", "Medical Service")}</h4>
                  <p className="text-sm text-slate-600 mb-2">
                    {t("خصم ٦٠٪ على التحاليل ومراكز الأشعة والأطباء المتخصصين. الخدمة مقدمة للجميع على حد سواء.", "60% discount on labs, imaging centers, and specialist doctors. Service provided to everyone equally.")}
                  </p>
                  <p className="text-sm font-semibold flex items-center gap-2">
                    <Phone className="w-4 h-4" /> <span dir="ltr">012 2412 4144</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="h-px bg-slate-200 w-full" />

          {/* Women's Ministry */}
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4 order-2 md:order-1">
              <h2 className="text-3xl font-bold text-slate-900">{t("خدمة السيدات", "Women's Ministry")}</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                {t(
                  "نسعى لتسديد الاحتياجات النفسية والاجتماعية والروحية، وتشجيع الكرازة وصنع تلاميذ من خلال مجموعات صغيرة تبدأ بالشركة والصلاة وتنتهي بدراسة كتابية عملية.",
                  "We seek to meet psychological, social, and spiritual needs; encourage evangelism; and make disciples through small groups that begin with fellowship and prayer and end with practical Bible study."
                )}
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mt-4 ml-4 rtl:mr-4 rtl:ml-0">
                <li>{t("مؤتمرات ورحلات ترفيهية", "Conferences and recreational trips")}</li>
                <li>{t("تدريب قادة نصف شهري", "Bi-monthly leader training")}</li>
                <li>{t("لقاءات مجمعة ربع سنوية", "Quarterly large gatherings")}</li>
              </ul>
            </div>
            <div className="md:col-span-4 flex justify-center order-1 md:order-2">
              <div className="w-32 h-32 md:w-48 md:h-48 bg-accent/10 text-accent rounded-full flex items-center justify-center">
                <Users className="w-16 h-16 md:w-24 md:h-24" />
              </div>
            </div>
          </div>

          <div className="h-px bg-slate-200 w-full" />

          {/* Married Couples Ministry */}
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4 flex justify-center">
              <div className="w-32 h-32 md:w-48 md:h-48 bg-secondary/10 text-secondary rounded-full flex items-center justify-center">
                <HomeIcon className="w-16 h-16 md:w-24 md:h-24" />
              </div>
            </div>
            <div className="md:col-span-8 space-y-4">
              <h2 className="text-3xl font-bold text-slate-900">{t("خدمة المتزوجين", "Married Couples Ministry")}</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                {t(
                  "تعتبر خدمة المتزوجين مقياس الحرارة للصحة الروحية والعلائقية في الكنيسة. تستهدف حديثي الزواج والمتزوجين في منتصف العمر تحت شعار 'ننمو في كل شيء' (أفسس ٤: ١٥).",
                  "The married couples ministry is the thermostat of spiritual and relational health in the church. It targets newly married and middle-aged couples under the motto 'We grow in all things' (Eph 4:15)."
                )}
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                {[
                  { ar: "مشورة كتابية", en: "Biblical Counseling" },
                  { ar: "كورس تربية الأبناء", en: "Child-raising Course" },
                  { ar: "كورس المشورة للمقبلين على الزواج", en: "Pre-marriage Course" },
                  { ar: "مؤتمر سنوي للأسرة", en: "Annual Family Conference" },
                ].map((item, i) => (
                  <div key={i} className="bg-slate-50 p-3 rounded border text-center text-sm font-semibold">
                    {t(item.ar, item.en)}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
