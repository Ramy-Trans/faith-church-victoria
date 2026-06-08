import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, MountainSnow, Phone, Info } from "lucide-react";

export default function Resources() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen pt-16">
      <section className="bg-slate-50 py-16 border-b">
        <div className="container px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              {t("الموارد", "Resources")}
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {t("مصادر وإعلانات ومعلومات تهمك من كنيسة الإيمان.", "Resources, announcements, and important information from Faith Church.")}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container px-4 max-w-5xl mx-auto space-y-12">
          
          {/* Jabel El Salah */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <MountainSnow className="w-6 h-6 text-primary" />
              {t("جبل الصلاة", "Jabel El Salah")}
            </h2>
            <Card className="border-0 shadow-md">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <p className="text-slate-600 leading-relaxed">
                      {t(
                        "تأسس جبل الصلاة عام ٢٠٠٢، ويقع على مساحة ٨٥ فدان بين وادي النطرون والنوبارية. رؤيتنا هي إقامة صلاة مستمرة من أجل مصر والعالم العربي.",
                        "Founded in 2002, Jabel El Salah spans 85 acres between Wadi El Natrun and Nobariya. Our vision is to establish continuous prayer for Egypt and the Arab world."
                      )}
                    </p>
                    <ul className="list-disc list-inside text-slate-600 space-y-1 ml-4 rtl:mr-4 rtl:ml-0">
                      <li>{t("يستوعب ٣٢٠ شخص", "Capacity of 320 persons")}</li>
                      <li>{t("يحتوي على ٤ قاعات للاجتماعات", "Includes 4 meeting halls")}</li>
                      <li>{t("غرف مخصصة للصلاة", "Dedicated prayer rooms")}</li>
                      <li>{t("مؤتمرات عابرة للطوائف ومعسكرات للشباب", "Inter-denominational conferences and youth camps")}</li>
                    </ul>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-lg space-y-4 border">
                    <h3 className="font-bold text-slate-900">{t("للتواصل والحجز:", "For Contact & Booking:")}</h3>
                    <div className="space-y-2 text-sm text-slate-600">
                      <p className="flex items-center gap-2"><Phone className="w-4 h-4"/> {t("الأخ/ بولس مجدي:", "Brother Boles Magdy:")} <span dir="ltr">0120 360 0662</span> / <span dir="ltr">0122 339 3568</span></p>
                      <p className="flex items-center gap-2"><Phone className="w-4 h-4"/> {t("الأخ/ بشير رشدي:", "Brother Bashir Rushdy:")} <span dir="ltr">0122 229 2066</span></p>
                    </div>
                    <a href="https://www.facebook.com/JabalElsalah" target="_blank" rel="noreferrer" className="inline-block mt-4 text-primary font-medium hover:underline">
                      {t("صفحة الفيسبوك لجبل الصلاة", "Jabel El Salah Facebook Page")}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Announcements */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Info className="w-6 h-6 text-accent" />
                {t("إعلانات الكنيسة", "Church Announcements")}
              </h2>
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <Card key={i} className="border-0 shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{t(`إعلان هام رقم ${i}`, `Important Announcement ${i}`)}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 text-sm">
                        {t("سيتم تحديث هذا القسم دورياً بآخر إعلانات الكنيسة المهمة لأعضائها وزوارها.", "This section will be updated regularly with the latest important announcements for church members and visitors.")}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <FileText className="w-6 h-6 text-secondary" />
                {t("مستندات وسياسات", "Documents & Policies")}
              </h2>
              <div className="space-y-4">
                <Card className="border-0 shadow-sm hover:bg-slate-50 transition-colors cursor-pointer">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-slate-400" />
                      <span className="font-medium text-slate-700">{t("دستور الكنيسة", "Church Constitution")}</span>
                    </div>
                    <span className="text-xs text-primary font-medium">{t("عرض", "View")}</span>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm hover:bg-slate-50 transition-colors cursor-pointer">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-slate-400" />
                      <span className="font-medium text-slate-700">{t("سياسة حماية الأطفال", "Child Protection Policy")}</span>
                    </div>
                    <span className="text-xs text-primary font-medium">{t("عرض", "View")}</span>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
