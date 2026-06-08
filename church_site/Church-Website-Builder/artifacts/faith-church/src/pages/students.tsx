import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Cross, BookOpen, Heart, Globe, GraduationCap } from "lucide-react";
import studentsImg from "@assets/image_1775740698464.png";

export default function Students() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen pt-16">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-slate-900/80 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${studentsImg})` }}
        />
        <div className="container relative z-20 px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold">
              {t("خدمة الشباب", "Students Ministry")}
            </h1>
            <p className="text-lg md:text-xl text-slate-300">
              {t(
                "للطلبة الجامعيين والخريجين",
                "For university students and graduates"
              )}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-slate-900">{t("رؤيتنا", "Our Vision")}</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {t(
                  "الوصول للشباب بالإنجيل ليعرفوا الرب يسوع حقيقة ويقبلوه مخلصاً شخصياً لحياتهم.",
                  "Reach youth with the Gospel so they know the Lord Jesus truly and accept Him as personal Savior."
                )}
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">{t("أهداف التلمذة", "Discipleship Aims")}</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <GoalCard 
                  icon={<Globe />}
                  titleAr="تلميذ كارز" titleEn="Missionary Disciple"
                  descAr="يشارك إيمانه مع الآخرين" descEn="Shares his faith with others"
                />
                <GoalCard 
                  icon={<Cross />}
                  titleAr="تلميذ عابد" titleEn="Worshipping Disciple"
                  descAr="يعيش حياة العبادة الحقيقية" descEn="Lives a life of true worship"
                />
                <GoalCard 
                  icon={<BookOpen />}
                  titleAr="تلميذ يتشكل بكلمة الله" titleEn="Word-shaped Disciple"
                  descAr="ينمو في معرفة الكتاب المقدس" descEn="Grows in knowing the Bible"
                />
                <GoalCard 
                  icon={<Users />}
                  titleAr="تلميذ في جسد المسيح" titleEn="Disciple in Christ's Body"
                  descAr="يعيش في شركة مع المؤمنين" descEn="Lives in fellowship with believers"
                />
                <GoalCard 
                  icon={<Heart />}
                  titleAr="تلميذ خادم" titleEn="Serving Disciple"
                  descAr="يستخدم مواهبه لخدمة الآخرين" descEn="Uses gifts to serve others"
                  className="md:col-span-2 max-w-md mx-auto w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container px-4 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">{t("برامجنا وأنشطتنا", "Our Programs")}</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { ar: "أيام العبادة", en: "Worship Days" },
              { ar: "مؤتمرات التلمذة", en: "Discipleship Conferences" },
              { ar: "مدارس الكتاب", en: "Bible Schools" },
              { ar: "فصول الدفاعيات", en: "Apologetics Classes" },
              { ar: "لقاءات الشركة", en: "Fellowship Gatherings" },
              { ar: "الرحلات الترفيهية", en: "Recreation Trips" },
            ].map((prog, i) => (
              <Card key={i} className="border-0 shadow-sm text-center">
                <CardContent className="p-6 flex flex-col items-center justify-center min-h-[120px]">
                  <h4 className="font-bold text-slate-900 text-lg">{t(prog.ar, prog.en)}</h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function GoalCard({ icon, titleAr, titleEn, descAr, descEn, className = "" }: any) {
  const { t } = useLanguage();
  return (
    <Card className={`border-0 shadow-sm ${className}`}>
      <CardContent className="p-6 flex items-start gap-4">
        <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div>
          <h4 className="font-bold text-slate-900 text-lg mb-1">{t(titleAr, titleEn)}</h4>
          <p className="text-slate-600">{t(descAr, descEn)}</p>
        </div>
      </CardContent>
    </Card>
  );
}
