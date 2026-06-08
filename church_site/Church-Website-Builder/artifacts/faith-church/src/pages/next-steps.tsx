import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music, Users, HeartHandshake, BookOpen } from "lucide-react";
import { Link } from "wouter";

export default function NextSteps() {
  const { t } = useLanguage();

  const steps = [
    {
      icon: <Music className="w-10 h-10" />,
      titleAr: "العبادة",
      titleEn: "Worship",
      descAr: "انضم إلى اجتماعاتنا الأسبوعية للعبادة وسماع كلمة الله.",
      descEn: "Join our weekly services for worship and hearing the Word of God.",
      link: "/first-visit"
    },
    {
      icon: <Users className="w-10 h-10" />,
      titleAr: "المجموعات",
      titleEn: "Groups",
      descAr: "ابحث عن مجموعة صغيرة بالقرب منك للشركة والنمو.",
      descEn: "Find a small group near you for fellowship and growth.",
      link: "/adults"
    },
    {
      icon: <HeartHandshake className="w-10 h-10" />,
      titleAr: "الخدمة",
      titleEn: "Serve",
      descAr: "اكتشف مواهبك واخدم في أحد مجالات الخدمة بالكنيسة.",
      descEn: "Discover your gifts and serve in one of our ministry areas.",
      link: "/contact"
    },
    {
      icon: <BookOpen className="w-10 h-10" />,
      titleAr: "التلمذة",
      titleEn: "Discipleship",
      descAr: "انمو بشكل أعمق في مسيرتك الإيمانية من خلال برامج التلمذة.",
      descEn: "Grow deeper in your faith walk through our discipleship programs.",
      link: "/students"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pt-16">
      <section className="bg-accent text-accent-foreground py-20">
        <div className="container px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold">
              {t("الخطوات القادمة", "Next Steps")}
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              {t(
                "بغض النظر عن مكانك في رحلتك الروحية، هناك دائماً خطوة تالية لتتخذها.",
                "No matter where you are in your spiritual journey, there's always a next step to take."
              )}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-8 text-center space-y-6">
                    <div className="mx-auto w-20 h-20 bg-slate-50 text-accent rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">{t(step.titleAr, step.titleEn)}</h3>
                      <p className="text-slate-600 mb-6">{t(step.descAr, step.descEn)}</p>
                      <Link href={step.link}>
                        <Button variant="outline" className="w-full sm:w-auto">
                          {t("اعرف المزيد", "Learn More")}
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
