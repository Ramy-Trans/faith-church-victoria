import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, MapPin, Baby, Shirt, HelpCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FirstVisit() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen pt-16">
      <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="container px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold">
              {t("زيارتك الأولى", "Your First Visit")}
            </h1>
            <p className="text-lg md:text-xl text-slate-300">
              {t("نحن سعداء لانضمامك إلينا. إليك ما يمكن توقعه.", "We're so glad you're joining us. Here's what to expect.")}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <InfoCard
              icon={<Clock className="h-8 w-8" />}
              title={t("مواعيد الاجتماعات", "Service Times")}
              description={t("الجمعة ٤ مساءً | الأحد ٧ مساءً", "Friday 4PM | Sunday 7PM")}
            />
            <InfoCard
              icon={<MapPin className="h-8 w-8" />}
              title={t("الموقع", "Location")}
              description={t("ميدان فيكتوريا، شبرا، القاهرة", "Victoria Square, Shubra, Cairo")}
            />
            <InfoCard
              icon={<Baby className="h-8 w-8" />}
              title={t("الأطفال", "Kids")}
              description={t("برامج آمنة للأطفال (٤-١٢ سنة)", "Safe programs for kids (ages 4-12)")}
            />
            <InfoCard
              icon={<Shirt className="h-8 w-8" />}
              title={t("الملابس", "What to Wear")}
              description={t("تعال كما أنت، ملابس عادية مناسبة", "Come as you are, casual dress is fine")}
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container px-4 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{t("الأسئلة الشائعة", "FAQ")}</h2>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="bg-white px-6 rounded-lg mb-4 border shadow-sm">
              <AccordionTrigger className="text-lg font-semibold text-slate-900">
                {t("ماذا أتوقع خلال الاجتماع؟", "What should I expect during the service?")}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 text-base pb-6">
                {t(
                  "فريق ترحيب ودود، وقت عبادة وتسبيح معاصر، ورسالة كتابية عملية — كل اجتماع يستغرق حوالي ساعتين.",
                  "A friendly welcome team, contemporary worship, and a practical Biblical message — each service lasts about 2 hours."
                )}
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="bg-white px-6 rounded-lg mb-4 border shadow-sm">
              <AccordionTrigger className="text-lg font-semibold text-slate-900">
                {t("أين يمكنني إيقاف سيارتي؟", "Where can I park?")}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 text-base pb-6">
                {t("يوجد أماكن للانتظار في الشوارع المحيطة بالكنيسة.", "Street parking is available in the areas surrounding the church.")}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
}

function InfoCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="text-center border-0 shadow-md hover:-translate-y-1 transition-transform duration-300">
      <CardContent className="pt-8 pb-8 space-y-4">
        <div className="mx-auto w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-900">{title}</h3>
        <p className="text-slate-600">{description}</p>
      </CardContent>
    </Card>
  );
}
