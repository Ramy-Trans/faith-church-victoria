import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Landmark, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Give() {
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t("تم استلام طلبك بنجاح", "Request received successfully"),
      description: t("شكراً لعطائك ومشاركتك في امتداد الملكوت.", "Thank you for your giving and participation in the extension of the Kingdom."),
    });
  };

  return (
    <div className="flex flex-col min-h-screen pt-16">
      <section className="bg-slate-50 py-20">
        <div className="container px-4 text-center max-w-3xl mx-auto space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              {t("العطاء", "Giving")}
            </h1>
            <p className="text-xl text-slate-600 font-serif italic mb-8">
              {t(
                "«أَعْطُوا تُعْطَوْا، كَيْلاً جَيِّدًا مُلَبَّدًا مَهْزُوزًا فَائِضًا يُعْطُونَ فِي أَحْضَانِكُمْ» (لوقا ٦: ٣٨)",
                "\"Give, and it will be given to you. A good measure, pressed down, shaken together and running over, will be poured into your lap.\" (Luke 6:38)"
              )}
            </p>
            <p className="text-lg text-slate-600">
              {t(
                "العطاء هو عمل عبادة وإيمان. من خلال عطائك، أنت تشارك في امتداد ملكوت الله وتغيير الحياة.",
                "Giving is an act of worship and faith. Through your giving, you participate in the extension of God's kingdom and changing lives."
              )}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container px-4">
          <div className="grid lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
            
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">{t("أنواع العطاء", "Types of Giving")}</h2>
              
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                    <Heart className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{t("العشور والتقدمات", "Tithes & Offerings")}</h3>
                    <p className="text-slate-600 text-sm">{t("لدعم الخدمة العامة للكنيسة واحتياجاتها التشغيلية.", "To support the general ministry of the church and its operational needs.")}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-full flex items-center justify-center shrink-0">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{t("الإرساليات", "Missions")}</h3>
                    <p className="text-slate-600 text-sm">{t("لدعم الكرازة والخدمة خارج نطاق الكنيسة المحلية.", "To support evangelism and ministry beyond the local church.")}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 text-accent rounded-full flex items-center justify-center shrink-0">
                    <Landmark className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{t("بناء المشاريع", "Building Projects")}</h3>
                    <p className="text-slate-600 text-sm">{t("للمساهمة في توسعات ومباني الكنيسة والمرافق التابعة لها.", "To contribute to church expansions, buildings, and facilities.")}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-7">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>{t("نموذج العطاء الإلكتروني", "Online Giving Form")}</CardTitle>
                  <CardDescription>{t("يرجى ملء البيانات التالية للتواصل معك بشأن العطاء.", "Please fill out the details below to contact you regarding your giving.")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">{t("الاسم الأول", "First Name")}</Label>
                        <Input id="firstName" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">{t("اسم العائلة", "Last Name")}</Label>
                        <Input id="lastName" required />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">{t("البريد الإلكتروني", "Email Address")}</Label>
                      <Input id="email" type="email" required />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="amount">{t("المبلغ", "Amount")}</Label>
                        <Input id="amount" type="number" min="1" placeholder="0.00" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="fund">{t("نوع العطاء", "Fund Type")}</Label>
                        <Select required>
                          <SelectTrigger className="w-full text-start" dir={t("rtl", "ltr")}>
                            <SelectValue placeholder={t("اختر نوع العطاء...", "Select fund type...")} />
                          </SelectTrigger>
                          <SelectContent dir={t("rtl", "ltr")}>
                            <SelectItem value="tithes">{t("العشور والتقدمات", "Tithes & Offerings")}</SelectItem>
                            <SelectItem value="missions">{t("الإرساليات", "Missions")}</SelectItem>
                            <SelectItem value="building">{t("بناء المشاريع", "Building Projects")}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">{t("ملاحظات (اختياري)", "Notes (Optional)")}</Label>
                      <Textarea id="notes" rows={3} />
                    </div>

                    <Button type="submit" className="w-full h-12 text-lg">
                      {t("تأكيد العطاء", "Submit Giving Request")}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
