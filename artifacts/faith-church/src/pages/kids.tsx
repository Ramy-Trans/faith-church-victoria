import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Baby, Users, BookOpen, Music, Video, Star } from "lucide-react";
import kidsImg from "@assets/image_1775740702854.png";

export default function Kids() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen pt-16">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-primary/90 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${kidsImg})` }}
        />
        <div className="container relative z-20 px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold">
              {t("خدمة الأطفال", "Kids Ministry")}
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              {t(
                "نربي جيلاً يعرف الله ويحبه ويخدمه",
                "Raising a generation that knows, loves, and serves God"
              )}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900">
                {t("عن الخدمة", "About the Ministry")}
              </h2>
              <p className="text-slate-600 leading-relaxed">
                {t(
                  "تستهدف خدمة الأطفال الفئة العمرية من ٤ إلى ١٢ سنة. لدينا ٢٠ مجموعة صغيرة تجتمع أسبوعياً لتقديم منهج سنوي يغطي الكتاب المقدس كاملاً في ٦ سنوات.",
                  "Our kids ministry targets ages 4 to 12. We have 20 small groups meeting weekly to present an annual curriculum covering the entire Bible in 6 years."
                )}
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                    <Baby className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{t("٤-١٢ سنة", "Ages 4-12")}</h4>
                    <p className="text-sm text-slate-500">{t("الفئة العمرية", "Age Group")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-full flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{t("٢٠ مجموعة", "20 Groups")}</h4>
                    <p className="text-sm text-slate-500">{t("مجموعات صغيرة", "Small Groups")}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-slate-50 border-0 shadow-sm mt-8">
                <CardContent className="p-6 text-center">
                  <BookOpen className="w-8 h-8 text-accent mx-auto mb-3" />
                  <h4 className="font-bold mb-2">{t("مدرسة الكتاب الصيفية", "Summer Bible School")}</h4>
                </CardContent>
              </Card>
              <Card className="bg-slate-50 border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <Video className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h4 className="font-bold mb-2">{t("مدارس الأحد أونلاين", "Sunday School Online")}</h4>
                  <p className="text-sm text-slate-500">{t("٥٢ حلقة منتجة", "52 episodes produced")}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{t("تنمية المواهب", "Talent Development")}</h2>
            <p className="text-slate-600">{t("نكتشف وننمي مواهب الأطفال لمجد الله", "Discovering and developing children's talents for God's glory")}</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: <Music />, ar: "الغناء", en: "Singing" },
              { icon: <Star />, ar: "الموسيقى", en: "Music" },
              { icon: <BookOpen />, ar: "الرسم", en: "Drawing" },
              { icon: <Users />, ar: "الدراما", en: "Drama" },
            ].map((item, i) => (
              <Card key={i} className="border-0 shadow-sm text-center hover:-translate-y-1 transition-transform">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-white text-accent rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                    {item.icon}
                  </div>
                  <h4 className="font-bold text-slate-900">{t(item.ar, item.en)}</h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
