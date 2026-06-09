import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t("تم إرسال رسالتك", "Message sent"),
      description: t("سنتواصل معك في أقرب وقت.", "We will get back to you shortly."),
    });
  };

  const handlePrayerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t("تم استلام طلب الصلاة", "Prayer request received"),
      description: t("سنصلي من أجلك.", "We will pray for you."),
    });
  };

  return (
    <div className="flex flex-col min-h-screen pt-16">
      <section className="bg-slate-900 text-white py-16">
        <div className="container px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold mb-4">
              {t("تواصل معنا", "Contact Us")}
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              {t("نحن هنا لخدمتك. لا تتردد في التواصل معنا لأي استفسار أو طلب صلاة.", "We are here to serve you. Please feel free to reach out for any inquiry or prayer request.")}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container px-4 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Contact Info */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-slate-900">{t("معلومات التواصل", "Contact Information")}</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{t("العنوان", "Address")}</h3>
                    <p className="text-slate-600">{t("ميدان فيكتوريا، شبرا، القاهرة", "Victoria Square, Shubra, Cairo")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{t("الهاتف", "Phone")}</h3>
                    <p className="text-slate-600" dir="ltr">+20 2 XXXX XXXX</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{t("البريد الإلكتروني", "Email")}</h3>
                    <p className="text-slate-600">info@faithchurch.eg</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{t("مواعيد المكتب", "Office Hours")}</h3>
                    <p className="text-slate-600">{t("الأحد - الخميس: ٩ صباحاً - ٥ مساءً", "Sunday - Thursday: 9 AM - 5 PM")}</p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="w-full h-48 bg-slate-200 rounded-lg flex items-center justify-center text-slate-500 overflow-hidden relative">
                <MapPin className="w-8 h-8 opacity-50 mb-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -mt-4" />
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-4 text-sm font-medium">{t("خريطة الموقع", "Map Location")}</span>
              </div>
            </div>

            {/* Forms */}
            <div className="lg:col-span-2 space-y-8">
              <div id="contact-form">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>{t("أرسل لنا رسالة", "Send us a message")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">{t("الاسم", "Name")}</Label>
                        <Input id="name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">{t("رقم الهاتف", "Phone Number")}</Label>
                        <Input id="phone" dir="ltr" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t("البريد الإلكتروني", "Email")}</Label>
                      <Input id="email" type="email" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">{t("الرسالة", "Message")}</Label>
                      <Textarea id="message" rows={4} required />
                    </div>
                    <Button type="submit">{t("إرسال الرسالة", "Send Message")}</Button>
                  </form>
                </CardContent>
              </Card>
              </div>

              <div id="prayer-form">
              <Card className="border-0 shadow-md bg-slate-50">
                <CardHeader>
                  <CardTitle className="text-primary">{t("طلبات الصلاة", "Prayer Requests")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePrayerSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="prayerName">{t("الاسم (اختياري)", "Name (Optional)")}</Label>
                      <Input id="prayerName" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="prayer">{t("طلب الصلاة", "Prayer Request")}</Label>
                      <Textarea id="prayer" rows={3} required placeholder={t("كيف يمكننا أن نصلي من أجلك؟", "How can we pray for you?")} />
                    </div>
                    <Button type="submit" variant="secondary">{t("أرسل طلب الصلاة", "Submit Prayer Request")}</Button>
                  </form>
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
