import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import img1 from "@assets/DSC_0223_1775737092462.JPG";
import img2 from "@assets/DSC_0359_1775737092462.JPG";

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold">
              {t("عن كنيسة الإيمان", "About Faith Church")}
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80">
              {t(
                "تأسست عام ١٩٦٩ على يد الدكتور القس سعيد إبراهيم أندراوس",
                "Founded in 1969 by Dr. Rev. Said Ibrahim Andraus"
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* History & Mission */}
      <section className="py-20">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-slate-900">{t("من نحن", "Who We Are")}</h2>
              <p className="text-slate-600 leading-relaxed">
                {t(
                  "تأسست كنيسة الإيمان بميدان فيكتوريا - شبرا عام ١٩٦٩ على يد الدكتور القس سعيد إبراهيم أندراوس (١٩٤٠–٢٠٢٠). نمت الكنيسة من مجموعة صغيرة في شبرا إلى مجتمع مزدهر نابض بالحياة يخدم المنطقة والمحيطين بها.",
                  "Faith Church Victoria Square - Shubra was founded in 1969 by Dr. Rev. Said Ibrahim Andraus (1940–2020). It has grown from a small gathering in Shubra into a thriving community serving the surrounding area."
                )}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-slate-900">{t("الرؤية والرسالة", "Vision & Mission")}</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg text-primary">{t("الرسالة", "Mission")}</h3>
                  <p className="text-slate-600">
                    {t(
                      "ربح النفوس للمسيح ومساعدتهم على النمو في الإيمان من خلال العبادة والتلمذة والخدمة والكرازة.",
                      "To win people to Christ and help them grow in faith through worship, discipleship, service and evangelism."
                    )}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-primary">{t("الرؤية", "Vision")}</h3>
                  <p className="text-slate-600">
                    {t(
                      "استعادة النموذج الكتابي للكنيسة الفعالة التي تتمم الإرسالية العظمى والوصية العظمى.",
                      "To restore the Biblical model of an effective church fulfilling the Great Commission and Great Commandment."
                    )}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-slate-50">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{t("قيمنا الأساسية", "Core Values")}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto text-center">
            {[
              { ar: "العبادة", en: "Worship" },
              { ar: "التلمذة", en: "Discipleship" },
              { ar: "الخدمة", en: "Service" },
              { ar: "المجتمع", en: "Community" },
              { ar: "الكرازة", en: "Evangelism" },
            ].map((value, i) => (
              <Card key={i} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg text-slate-900">{t(value.ar, value.en)}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{t("القيادة", "Leadership")}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              {t("مؤسس كنيسة الإيمان بشبرا", "Founder of Faith Church Shubra")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square bg-slate-200 rounded-xl overflow-hidden relative">
                  <img src={img1} alt="Rev. Said Ibrahim" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-square bg-slate-200 rounded-xl overflow-hidden relative">
                  <img src={img2} alt="Rev. Said Ibrahim Preaching" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {t("د. القس سعيد إبراهيم أندراوس", "Dr. Rev. Said Ibrahim Andraus")}
                </h3>
                <p className="text-primary font-medium">{t("١٩٤٠ - ٢٠٢٠", "1940 - 2020")}</p>
              </div>

              <div className="space-y-4 text-slate-600 text-sm md:text-base leading-relaxed">
                <p>
                  {t(
                    "ولد في ٢٠ أغسطس ١٩٤٠ في قرية الأحايوة بسوهاج. جدد إيمانه في ١١ أبريل ١٩٥٣ ودُعي للخدمة في سن ١٤ عاماً.",
                    "Born August 20, 1940 in El Ahaywa village, Sohag. Renewed his faith on April 11, 1953 and was called to ministry at age 14."
                  )}
                </p>
                <p>
                  {t(
                    "درس اللاهوت في معهد كنيسة الإيمان بجرجا وتخرج عام ١٩٦٠. حصل على ليسانس الحقوق من جامعة القاهرة عام ١٩٧٢.",
                    "Studied theology at Faith Church Institute in Girga, graduating in 1960. Earned a Law degree from Cairo University in 1972."
                  )}
                </p>
                <p>
                  {t(
                    "أسس كنيسة الإيمان الجديدة بشبرا، القاهرة عام ١٩٦٨، وافتتحت في ٣ أبريل ١٩٦٩. حصل على دكتوراة فخرية في اللاهوت من كلية الكتاب المقدس بأوهايو، الولايات المتحدة عام ٢٠٠٤.",
                    "Founded the new Faith Church in Shubra, Cairo in 1968, opening on April 3, 1969. Received an Honorary Doctorate in Theology from God's Bible School & College, Ohio, USA in May 2004."
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
