import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin, Clock } from "lucide-react";

export default function Events() {
  const { t } = useLanguage();

  const events = [
    {
      titleAr: "كامب الشباب",
      titleEn: "Youth Camp",
      dateAr: "١٥-١٨ يوليو ٢٠٢٤",
      dateEn: "July 15-18, 2024",
      time: "9:00 AM",
      locationAr: "وادي النطرون",
      locationEn: "Wadi El Natrun",
      descAr: "مخيم روحي وترفيهي للشباب الجامعي والخريجين.",
      descEn: "A spiritual and recreational camp for university students and graduates."
    },
    {
      titleAr: "مؤتمر الأسرة",
      titleEn: "Family Conference",
      dateAr: "٢٠-٢٢ يونيو ٢٠٢٤",
      dateEn: "June 20-22, 2024",
      time: "10:00 AM",
      locationAr: "جبل الصلاة",
      locationEn: "Jabel El Salah",
      descAr: "مؤتمر سنوي للأسرة للنمو في العلاقات العائلية الكتابية.",
      descEn: "Annual family conference to grow in Biblical family relationships."
    },
    {
      titleAr: "اجتماع الصلاة",
      titleEn: "Prayer Meeting",
      dateAr: "كل جمعة",
      dateEn: "Every Friday",
      time: "7:00 PM",
      locationAr: "مبنى الكنيسة - القاعة الرئيسية",
      locationEn: "Church Building - Main Hall",
      descAr: "وقت للصلاة والشفاعة من أجل الكنيسة والبلد.",
      descEn: "A time of prayer and intercession for the church and the nation."
    },
  ];

  return (
    <div className="flex flex-col min-h-screen pt-16">
      <section className="bg-secondary text-secondary-foreground py-20">
        <div className="container px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">
              {t("الفعاليات", "Events")}
            </h1>
            <p className="text-lg md:text-xl text-secondary-foreground/90">
              {t("اكتشف ما يحدث في كنيسة الإيمان وكن جزءاً من عائلتنا.", "Discover what's happening at Faith Church and be part of our family.")}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container px-4 max-w-5xl mx-auto">
          <div className="grid gap-6">
            {events.map((evt, i) => (
              <Card key={i} className="border-0 shadow-md overflow-hidden flex flex-col md:flex-row">
                <div className="bg-slate-900 text-white p-6 md:w-64 flex flex-col justify-center items-center text-center shrink-0">
                  <CalendarDays className="w-10 h-10 mb-3 text-secondary" />
                  <span className="font-bold text-lg">{t(evt.dateAr, evt.dateEn)}</span>
                  <span className="text-slate-300 mt-1 flex items-center gap-1">
                    <Clock className="w-4 h-4" /> {evt.time}
                  </span>
                </div>
                <CardContent className="p-6 md:p-8 flex-1 flex flex-col justify-center">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">{t(evt.titleAr, evt.titleEn)}</h3>
                      <p className="text-slate-500 flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-primary" />
                        {t(evt.locationAr, evt.locationEn)}
                      </p>
                    </div>
                    <Button>{t("تسجيل", "Register")}</Button>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {t(evt.descAr, evt.descEn)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
